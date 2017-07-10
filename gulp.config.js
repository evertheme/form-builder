module.exports = function() {
    var src = 'src/';
    var app = src + 'app/';
    var index = src + 'index.html';
    var build = 'src/dist/';
    var buildIndex = build + 'index.html';
    var devSnapCSS = 'http://usmlrs1296.arrow.com:7782/snap/v3.0/assets/ui/styles/snap.min.css';
    var testSnapCSS = 'http://usmlrs1297.arrow.com:7781/snap/v3.0/assets/ui/styles/snap.min.css';
    var qualSnapCSS = 'https://qaecswc.arrow.com/snap/v3.0/assets/ui/styles/snap.min.css';
    var ebt1SnapCSS = 'http://usmlrs1577.arrow.com:8001/snap/v3.0/assets/ui/styles/snap.min.css';
    var prodSnapCSS = 'https://ecswc.arrow.com/snap/v3.0/assets/ui/styles/snap.min.css';
    var baseRef = '<base href="/">';
    var baseRefGlobal = '<base href="/form_builder/">';

    return {
        src: src,
        app: app,
        index: index,
        build: build,
        buildIndex: buildIndex,
        devSnapCss: devSnapCSS,
        testSnapCSS: testSnapCSS,
        qualSnapCSS: qualSnapCSS,
        ebt1SnapCSS: ebt1SnapCSS,
        prodSnapCSS: prodSnapCSS,
        baseRef: baseRef,
        baseRefGlobal: baseRefGlobal
    };
};
