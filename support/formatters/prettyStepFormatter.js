const { Formatter } = require('@cucumber/cucumber');

class PrettyStepFormatter extends Formatter {
  constructor(options) {
    super(options);

    const testCases = new Map();
    const pickles = new Map();
    const gherkinDocs = new Map();
    const stepTimers = new Map();
    const scenarioResults = new Map();
    let passed = 0;
    let failed = 0;
    let skipped = 0;

    options.eventBroadcaster.on('envelope', (envelope) => {
      if (envelope.gherkinDocument) {
        gherkinDocs.set(envelope.gherkinDocument.uri, envelope.gherkinDocument);
      }

      if (envelope.pickle) {
        pickles.set(envelope.pickle.id, envelope.pickle);
      }

      if (envelope.testCase) {
        testCases.set(envelope.testCase.id, envelope.testCase);
      }

      if (envelope.testCaseStarted) {
        const tc = testCases.get(envelope.testCaseStarted.testCaseId);
        const pickle = pickles.get(tc?.pickleId);
        const doc = gherkinDocs.get(pickle?.uri);
        const feature = doc?.feature?.name || '';

        console.log(`\nFeature: ${feature}`);
        console.log(`  Scenario: ${pickle?.name}\n`);
      }

      if (envelope.testStepStarted) {
        stepTimers.set(envelope.testStepStarted.testStepId, Date.now());
        global.__allureSubSteps = [];
        global.__allureAttachments = [];
      }

      if (envelope.testStepFinished) {
        const stepId = envelope.testStepFinished.testStepId;
        const startTime = stepTimers.get(stepId) || Date.now();
        const elapsed = Date.now() - startTime;

        const tcEntry = [...testCases.entries()].find(([_, v]) =>
          v.testSteps?.some((s) => s.id === stepId)
        );
        if (!tcEntry) return;

        const tc = tcEntry[1];
        const testStep = tc.testSteps.find((s) => s.id === stepId);
        if (!testStep?.pickleStepId) return;

        const pickle = pickles.get(tc.pickleId);
        const pickleStep = pickle?.steps?.find((s) => s.id === testStep.pickleStepId);
        if (!pickleStep) return;

        const doc = gherkinDocs.get(pickle?.uri);
        const keyword = findKeyword(doc, pickleStep) || '';

        const status = envelope.testStepFinished.testStepResult?.status;
        const icon = status === 'PASSED' ? '✔' : status === 'FAILED' ? '✖' : '-';

        const subSteps = global.__allureSubSteps || [];
        const attachments = global.__allureAttachments || [];

        const meta = [];
        if (subSteps.length > 0) meta.push(`${subSteps.length} sub-step${subSteps.length > 1 ? 's' : ''}`);
        if (attachments.length > 0) meta.push(`${attachments.length} attachment${attachments.length > 1 ? 's' : ''}`);
        const metaStr = meta.length > 0 ? `  [${meta.join(', ')}]` : '';

        console.log(`    ${icon} ${keyword}${pickleStep.text}${metaStr}  ${formatTime(elapsed)}`);

        for (const sub of subSteps) {
          const subIcon = sub.error ? '❌' : '  ';
          console.log(`      ${subIcon}  ${sub.name}  ${formatTime(sub.duration)}`);
          if (sub.error) {
            console.log(`          ⚠️  ${sub.error}`);
          }
        }

        for (const att of attachments) {
          console.log(`        📎 ${att.name} (${att.size})`);
        }

        if (status === 'FAILED') {
          const errMsg = envelope.testStepFinished.testStepResult?.message || '';
          if (errMsg && subSteps.every(s => !s.error)) {
            console.log(`        ⚠️  ${errMsg.split('\n')[0]}`);
          }
        }

        global.__allureSubSteps = [];
        global.__allureAttachments = [];
      }

      if (envelope.testStepFinished) {
        const status2 = envelope.testStepFinished.testStepResult?.status;
        const tcStartedId2 = envelope.testStepFinished.testCaseStartedId;
        if (status2 === 'FAILED') {
          scenarioResults.set(tcStartedId2, 'FAILED');
        } else if (status2 === 'SKIPPED') {
          if (!scenarioResults.has(tcStartedId2)) scenarioResults.set(tcStartedId2, 'SKIPPED');
        } else if (status2 === 'PASSED') {
          if (!scenarioResults.has(tcStartedId2)) scenarioResults.set(tcStartedId2, 'PASSED');
        }
      }

      if (envelope.testCaseFinished) {
        const result = scenarioResults.get(envelope.testCaseFinished.testCaseStartedId) || 'PASSED';
        if (result === 'FAILED') failed++;
        else if (result === 'SKIPPED') skipped++;
        else passed++;
        console.log('');
      }

      if (envelope.testRunFinished) {
        console.log('\n────────────────────────────────────');
        console.log(`  ✔ ${passed} passed`);
        if (failed > 0) console.log(`  ✖ ${failed} failed`);
        if (skipped > 0) console.log(`  ⊘ ${skipped} skipped`);
        console.log(`  Total: ${passed + failed + skipped} scenarios`);
        console.log('────────────────────────────────────\n');
      }
    });
  }
}

function findKeyword(doc, pickleStep) {
  if (!doc?.feature?.children) return '';
  for (const child of doc.feature.children) {
    const scenario = child.scenario || child.background;
    if (!scenario?.steps) continue;
    for (const s of scenario.steps) {
      if (s.text === pickleStep.text) {
        return s.keyword;
      }
    }
  }
  return '';
}

function formatTime(ms) {
  if (ms < 1000) return `${ms}ms`;
  const s = Math.floor(ms / 1000);
  const rest = ms % 1000;
  return `${s}s ${rest}ms`;
}

module.exports = PrettyStepFormatter;
