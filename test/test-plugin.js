import test from 'ava';
import posthtml from 'posthtml';
import clone from '../src/index.js';

function processing(html, options) {
	return posthtml()
		.use(clone(options))
		.process(html);
}

test('plugin must be function', t => {
	t.true(typeof clone === 'function');
});

test('should clone to attribute css module', async t => {
	const fixture = '<html><head></head><body class="my-class-to-body"></body></html>';
	const expected = '<html><head></head><body class="my-class-to-body" css-module="my-class-to-body"></body></html>';
	t.deepEqual(expected, (await processing(fixture)).html);
});

test('should remove attribute class after clone', async t => {
	const fixture = '<html><head></head><body class="my-class-to-body"></body></html>';
	const expected = '<html><head></head><body css-module="my-class-to-body"></body></html>';
	t.deepEqual(expected, (await processing(fixture, {removeClass: true})).html);
});
