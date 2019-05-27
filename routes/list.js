var express = require('express');
var router = express.Router();
const dyttReptitle = require('dytt-reptitle');

/* GET users listing. */
router.get('/:page', function(req, res, next) {
    var config = {
        page: req.params.page * 1,
        skip: 0,
        include: ['title', 'imgUrl', 'desc', 'downloadLink', 'descPageLink']
    };
    dyttReptitle(config).then(result => {
        res.send(result);
    });

});

module.exports = router;