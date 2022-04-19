function Spy(target, method) {
	const spy = {};
	const oldFn = target[method];
	spy.count = 0;
	target[method] = function () {
		spy.count += 1;
		oldFn.apply(this, arguments);
	};
	return spy;
}