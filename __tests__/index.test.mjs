import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import stylelint from 'stylelint';

import config from '../index.js';

const validScss = readFileSync('./__tests__/valid.scss', 'utf-8');
const invalidScss = readFileSync('./__tests__/invalid.scss', 'utf-8');

describe('flags no warnings with valid scss', () => {
	/**
	 * @type {import('stylelint').LinterResult}
	 */
	let result;

	beforeEach(async () => {
		result = await stylelint.lint({
			code: validScss,
			config,
		});
	});

	it('did not error', () => {
		assert.equal(result.errored, false);
	});

	it('flags no warnings', () => {
		assert.equal(result.results[0].warnings.length, 0);
	});
});

describe('flags warnings with invalid scss', () => {
	/**
	 * @type {import('stylelint').LinterResult}
	 */
	let result;

	beforeEach(async () => {
		result = await stylelint.lint({
			code: invalidScss,
			config,
		});
	});

	it('did error', () => {
		assert.equal(result.errored, true);
	});

	it('flags warnings', () => {
		assert.equal(result.results[0].warnings.length, 19);
	});

	it('correct warning text', () => {
		assert.deepEqual(
			result.results[0].warnings.map((warning) => warning.text),
			[
				'Expected $-variable to come before declaration (order/order)',
				'Use @each $key, $value in $map syntax instead of $value: map-get($map, $key) (scss/at-each-key-value-single-line)',
				'Expected "$value * 1px" instead of "#{$value}px". Consider writing "value" in terms of px originally. (scss/dimension-no-non-numeric-values)',
				'Expected single space after ":" with a single-line value (scss/dollar-variable-colon-space-after)',
				'Expected !default flag for "$dollar-variable-default" (scss/dollar-variable-default)',
				'Expected an empty line after $-variable (scss/dollar-variable-empty-line-after)',
				'Unexpected duplicate dollar variable $no-duplicate-dollar-variables (scss/no-duplicate-dollar-variables)',
				'Unnecessary nesting selector (&) (scss/selector-no-redundant-nesting-selector)',
				'Unexpected union class name with the parent selector (&) (scss/selector-no-union-class-name)',
				'Unexpected at-rule "debug" (at-rule-disallowed-list)',
				'Expected legacy color-function notation (color-function-notation)',
				'Expected "#fff" to be "#ffffff" (color-hex-length)',
				'Unexpected named color "white" (color-named)',
				'Unexpected value "none" for property "border" (declaration-property-value-disallowed-list)',
				'Expected nesting depth to be no more than 2 (max-nesting-depth)',
				'Expected empty line before rule (rule-empty-line-before)',
				'Expected ".selector-max-compound-selectors" to have no more than 3 compound selectors (selector-max-compound-selectors)',
				'Expected "selector-max-id#selector-no-qualifying-type" to have no more than 0 ID selectors (selector-max-id)',
				'Unexpected qualifying type selector "selector-max-id#selector-no-qualifying-type" (selector-no-qualifying-type)',
			],
		);
	});

	it('correct rule flagged', () => {
		assert.deepEqual(
			result.results[0].warnings.map((warning) => warning.rule),
			[
				'order/order',
				'scss/at-each-key-value-single-line',
				'scss/dimension-no-non-numeric-values',
				'scss/dollar-variable-colon-space-after',
				'scss/dollar-variable-default',
				'scss/dollar-variable-empty-line-after',
				'scss/no-duplicate-dollar-variables',
				'scss/selector-no-redundant-nesting-selector',
				'scss/selector-no-union-class-name',
				'at-rule-disallowed-list',
				'color-function-notation',
				'color-hex-length',
				'color-named',
				'declaration-property-value-disallowed-list',
				'max-nesting-depth',
				'rule-empty-line-before',
				'selector-max-compound-selectors',
				'selector-max-id',
				'selector-no-qualifying-type',
			],
		);
	});

	it('correct severity flagged', () => {
		assert.deepEqual(
			result.results[0].warnings.map((warning) => warning.severity),
			[
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
				'error',
			],
		);
	});

	it('correct line number', () => {
		assert.deepEqual(
			result.results[0].warnings.map((warning) => warning.line),
			[39, 49, 57, 61, 64, 67, 78, 89, 96, 2, 5, 8, 11, 15, 22, 68, 22, 105, 105],
		);
	});

	it('correct column number', () => {
		assert.deepEqual(
			result.results[0].warnings.map((warning) => warning.column),
			[5, 7, 29, 35, 1, 1, 5, 5, 5, 1, 27, 20, 15, 13, 13, 1, 13, 1, 1],
		);
	});
});
