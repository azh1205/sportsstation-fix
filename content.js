(function() {
    let patched = false;

    document.addEventListener('mousedown', e => { window._lastMouseEvent = e; }, true);

    function patch() {
        if (patched) return;
        const card = document.querySelector('[data-pid]');
        if (!card?.__vue__?.$parent?.$options?.methods?.handleGoDetails) return;

        const parent = card.__vue__.$parent;
        const original = parent.$options.methods.handleGoDetails.bind(parent);

        parent.handleGoDetails = function(p) {
            const e = window._lastMouseEvent;
            if ((e?.ctrlKey || e?.metaKey || e?.button === 1) && p.pdpUrl) {
                window.open(p.pdpUrl, '_blank');
                return;
            }
            return original(p);
        };

        patched = true;
        console.log('SS Fix: Ready!');
    }

    setInterval(patch, 500);
})();