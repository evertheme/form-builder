let express = require('express');
let webpackDevMiddleware = require("webpack-dev-middleware");
let webpackHotMiddleware = require("webpack-hot-middleware");
let webpack = require("webpack");
let webpackConfig = require("./config/webpack.dev");
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let DynamicForm = require('./schema/dynamic-form.model');
let FormRequest = require('./schema/form-request.model');
let path = require('path');
let app = express();
let compiler = webpack(webpackConfig);

mongoose.connect('mongodb://XXECS_FB:arrow123@usmlrs1809.arrow.com:27001/XXECS_FORM_BUILDER', {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.delete('/dynamic-forms/:formId', function(req, res) {
    DynamicForm.remove({_id: req.params.formId}, function(err, form) {
        if (!err) {
            res.json({ data: { message: 'Successfully deleted form.' } });
        } else {
            res.sendStatus(500).json({message: 'Error removing form by id.'});
        }
    });
});

app.get('/dynamic-forms', function(req, res) {
    DynamicForm.find({}, function(err, forms) {
        if (!err) {
            res.json({ data: forms });
        } else {
            res.sendStatus(500).json({message: 'Error finding forms.'});
        }
    });
});

app.get('/dynamic-forms/:formId', function(req, res) {
    DynamicForm.findOne({_id: req.params.formId}, function(err, form) {
        if (!err) {
            res.json({ data: form });
        } else {
            res.sendStatus(500).json({message: 'Error finding form by id.'});
        }
    });
});

app.post('/submit-form', function(req, res) {
    let createdDate = new Date();

    req.body.createdDate = createdDate;
    req.body.updatedDate = createdDate;
    req.body.formBody = [];

    let dynamicForm = new DynamicForm(req.body);

    dynamicForm.save(function(err, form) {
        if (!err) {
            res.json({ data: form });
        } else {
            res.sendStatus(500).json({message: 'Error saving new form.'});
        }
    });
});

app.put('/submit-form/:id', function(req, res) {
    DynamicForm.findOneAndUpdate({_id: req.params.id}, req.body, function(err, form) {
        if (!err) {
            res.json({ data: form });
        } else {
            res.sendStatus(500).json({message: 'Error updating form.'});
        }
    });
});

app.put('/submit-form/name/:formName', function(req, res) {
    DynamicForm.findOneAndUpdate({formName: req.params.formName},
                                 {formBody: req.body.formBody},
                                 { new: true },
                                 function(err, form) {
        if (!err) {
            res.json({ data: form });
        } else {
            res.sendStatus(500).json({message: 'Error updating form.'});
        }
    });
});

app.get('/form-requests/:requestId', function(req, res) {
    FormRequest.findOne({ requestId: req.params.requestId }, function(err, formRequest) {
        if (!err) {
            res.json({ data: formRequest });
        } else {
            res.sendStatus(500).json({message: 'Error getting form request.'});
        }
    });
});

if (process.env.NODE_ENV === 'build') {
    app.use(express.static('./src/dist/'));
    app.use('*', express.static('./src/dist/index.html'));
} else {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));

    let DIST_DIR = path.join(__dirname, "dist"),
        HTML_FILE = path.join(DIST_DIR, "index.html");

    app.get("*", (req, res, next) => {
        compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
}

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
