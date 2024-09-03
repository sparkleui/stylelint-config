'use strict';

/** @type {import('stylelint').Config} */
module.exports = {
    extends: ['stylelint-config-standard-scss'],
    plugins: ['stylelint-order'],
    rules: {
        'at-rule-disallowed-list': ['debug'],
'color-function-notation': [
			'legacy',
			{
				ignore: ['with-var-inside'],
			},
		],
        'color-hex-length': 'long',
        'color-named': ['never', { ignore: ['inside-function'] }],
        'declaration-property-value-disallowed-list': {
            'border': ['none'],
            'border-top': ['none'],
            'border-right': ['none'],
            'border-bottom': ['none'],
            'border-left': ['none'],
        },
        'max-nesting-depth': [
            2,
            {
                ignore: ['pseudo-classes'],
				ignoreAtRules: ['include', 'media', 'supports', 'each', 'if'],
                ignoreRules: ['/^&\\S+/'],
            },
        ],
        'no-descending-specificity': null,
        'number-max-precision': null,
        'order/order': [
            'custom-properties',
            'dollar-variables',
            {
                type: 'at-rule',
                name: 'extend',
            },
            {
                type: 'at-rule',
                name: 'include',
                hasBlock: false,
            },
            'declarations',
            {
                type: 'at-rule',
                name: 'include',
                hasBlock: true,
            },
            {
                type: 'rule',
                selector: '^&:[\\w-]+',
                name: 'pseudo-classes',
            },
            {
                type: 'rule',
                selector: '^&::[\\w-]+',
                name: 'pseudo-elements',
            },
            {
                type: 'rule',
                selector: '^\\S+ &$',
                name: 'parent-elements',
            },
            {
                type: 'rule',
                selector: '^&\\S+',
                name: 'nested-elements',
            },
            'rules',
        ],
        'scss/at-each-key-value-single-line': true,
        'scss/dimension-no-non-numeric-values': true,
        'scss/dollar-variable-colon-space-after': 'always-single-line',
        'scss/dollar-variable-default': [true, { ignore: 'local' }],
        'scss/dollar-variable-empty-line-after': [
            'always',
            {
                except: ['last-nested', 'before-comment', 'before-dollar-variable'],
                ignore: ['before-comment', 'inside-single-line-block'],
            },
        ],
        'scss/dollar-variable-empty-line-before': null,
        'scss/no-duplicate-dollar-variables': [
            true,
            { ignoreInsideAtRules: ['if', 'else', 'mixin', 'function'], ignoreDefaults: true },
        ],
        'scss/no-global-function-names': null,
        'scss/operator-no-newline-after': null,
        'scss/selector-no-redundant-nesting-selector': true,
        'scss/selector-no-union-class-name': true,
        'selector-class-pattern': null,
        'selector-max-compound-selectors': 3,
        'selector-max-id': 0,
        'selector-no-qualifying-type': [true, { ignore: ['attribute', 'class'] }],
    },
};
