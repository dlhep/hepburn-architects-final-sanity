import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateFees, defaultFeeSettings, feeProjectTypes, resolveFeeSettings } from '../lib/fee-settings.ts';

// Independent snapshot of the original calculator rules: preserve live prices.
const multipliers = [1, 1.2, 1.15, 1.05, 1, .9, 1.2, 1.3, 1.3, 1.5, 1.45, 1.8];
const bases = { survey: 450, planning: 1650, building: 1500 };
test('default fees match the previous calculator across all project types, routes and size boundaries', () => {
  feeProjectTypes.forEach((project, index) => {
    for (const area of [10, 30, 40, 45, 80, 85, 150, 155, 300]) for (const count of [1, 3, 4, 5, 6, 12]) for (const route of ['straightforward', 'full', 'complex']) {
      const input = { type: project.value, area, units: count, bedrooms: count, route, selected: Object.keys(bases) };
      const scale = project.metric === 'units' ? 1 + Math.max(0, count - 1) * .18 : project.metric === 'bedrooms' ? 1 + Math.max(0, count - 4) * .08 : area > 150 ? 1.35 : area > 80 ? 1.2 : area > 40 ? 1.1 : 1;
      let multiplier = multipliers[index] * scale;
      if (route === 'full') multiplier *= 1.1;
      if (route === 'complex') multiplier *= 1.22;
      for (const row of calculateFees(defaultFeeSettings, input)) {
        const expected = row.key === 'survey' ? Math.round(bases[row.key] * (project.metric === 'area' ? 1 : 1.15) / 50) * 50 : Math.round(bases[row.key] * multiplier * .9 / 50) * 50;
        assert.equal(row.adjusted, expected, JSON.stringify(input));
        assert.equal(row.lower, Math.round(expected * .87 / 50) * 50);
      }
    }
  });
});

test('manual fees, zero discount and project adjustments flow into the quote', () => {
  const settings = resolveFeeSettings({ survey: 600, planning: 2000, building: 1600, discountPercent: 0, projectUplifts: { twoStorey: 25 } });
  const rows = calculateFees(settings, { type: 'two-storey-extension', area: 30, units: 1, bedrooms: 4, route: 'straightforward', selected: ['survey', 'planning', 'building'] });
  assert.deepEqual(rows.map(r => r.adjusted), [600, 2500, 2000]);
  assert.equal(calculateFees(settings, { type: 'hmo', area: 30, units: 1, bedrooms: 5, route: 'complex', selected: ['survey'] })[0].adjusted, 700);
});

test('invalid or missing saved fields use safe defaults and do not mutate them', () => {
  assert.deepEqual(resolveFeeSettings(null), defaultFeeSettings);
  const settings = resolveFeeSettings({ survey: -1, planning: '500', building: Infinity, discountPercent: 101, projectUplifts: { hmo: NaN, loft: -91, flats: 501, gardenRoom: 0 } });
  assert.equal(settings.survey, 450);
  assert.equal(settings.planning, 1650);
  assert.equal(settings.building, 1500);
  assert.equal(settings.discountPercent, 10);
  assert.equal(settings.projectUplifts.hmo, 20);
  assert.equal(settings.projectUplifts.gardenRoom, 0);
  assert.equal(defaultFeeSettings.projectUplifts.gardenRoom, -10);
});

test('zero fees and empty selections are respected', () => {
  const input = { type: 'single-storey-extension', area: 30, units: 1, bedrooms: 4, route: 'straightforward', selected: [] };
  assert.deepEqual(calculateFees(defaultFeeSettings, input), []);
  assert.equal(calculateFees(resolveFeeSettings({ planning: 0 }), { ...input, selected: ['planning'] })[0].adjusted, 0);
});
