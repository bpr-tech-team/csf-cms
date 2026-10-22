// Runs while HTML is parsed, independently of React hydration. The observer also
// handles images inserted/replaced by client navigation and live preview.
export const heroRevealScript = `
(function () {
    var selector = 'img[data-hero-image]';
    var watched = new WeakMap();

    function watch(image) {
        var section = image.closest('[data-hero-reveal]');
        if (!section) return;

        var source = image.getAttribute('src') + '|' + image.getAttribute('srcset');
        var previous = watched.get(image);
        if (previous && previous.source === source) return;
        if (previous) previous.cancel();

        var settled = false;
        var decoding = false;
        var timer;
        var state = { source: source, cancel: cancel };
        watched.set(image, state);
        section.setAttribute('data-hero-reveal', 'pending');

        function cancel() {
            settled = true;
            clearTimeout(timer);
            image.removeEventListener('load', loaded);
            image.removeEventListener('error', failed);
        }

        function finish(status) {
            if (settled || watched.get(image) !== state) return;
            cancel();
            section.setAttribute('data-hero-reveal', status);
        }

        function failed() {
            finish('error');
        }

        function loaded() {
            if (settled || decoding) return;
            if (!image.naturalWidth) return failed();
            decoding = true;
            if (typeof image.decode === 'function') {
                image.decode().then(function () { finish('ready'); }, failed);
            } else {
                finish('ready');
            }
        }

        image.addEventListener('load', loaded);
        image.addEventListener('error', failed);
        // A failed or stalled photo must not leave the hero text inaccessible.
        // The error state keeps a late image hidden, avoiding a second reveal.
        timer = setTimeout(failed, 8000);
        if (image.complete) loaded();
    }

    function scan(node) {
        if (node.nodeType !== 1) return;
        if (node.matches(selector)) watch(node);
        node.querySelectorAll(selector).forEach(watch);
    }

    var observer = new MutationObserver(function (records) {
        records.forEach(function (record) {
            if (record.type === 'attributes') {
                if (record.target.matches(selector)) watch(record.target);
            } else {
                record.addedNodes.forEach(scan);
            }
        });
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'srcset']
    });
    document.querySelectorAll(selector).forEach(watch);
    document.documentElement.setAttribute('data-hero-reveal-enabled', '');
})();
`;

export const InitHeroReveal = () => (
    <script
        dangerouslySetInnerHTML={{ __html: heroRevealScript }}
        id="hero-reveal-script"
    />
);
