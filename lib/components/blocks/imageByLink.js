'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _index = require('../../model/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _class = function (_Component) {
  (0, _inherits3['default'])(_class, _Component);

  function _class(props) {
    (0, _classCallCheck3['default'])(this, _class);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _Component.call(this, props));

    var _this$props = _this.props,
        block = _this$props.block,
        blockProps = _this$props.blockProps;

    var _block$getData$toJS = block.getData().toJS(),
        direction = _block$getData$toJS.direction,
        url = _block$getData$toJS.url;

    _this.config = blockProps.config;

    _this.updateData = _this.updateData.bind(_this);
    _this.dataForUpdate = _this.dataForUpdate.bind(_this);
    _this.componentDidMount = _this.componentDidMount.bind(_this);
    _this.updateDataSelection = _this.updateDataSelection.bind(_this);
    _this.handleGrafFigureSelectImg = _this.handleGrafFigureSelectImg.bind(_this);

    _this.state = {
      caption: _this.config.imageCaptionPlaceholder,
      direction: direction || 'center',
      selected: false, // probably unused
      url: url
    };
    return _this;
  }

  _class.prototype.componentDidMount = function componentDidMount() {
    var blockProps = this.props.blockProps;

    if (!blockProps.data) {
      return;
    }

    var _dataForUpdate = this.dataForUpdate(),
        url = _dataForUpdate.provisory_text;

    if (url) {
      this.setState({ url: url, provisory_text: '' }, this.updateData);
    }
  };

  _class.prototype.updateData = function updateData() {
    var _props = this.props,
        block = _props.block,
        blockProps = _props.blockProps;
    var getEditorState = blockProps.getEditorState,
        setEditorState = blockProps.setEditorState;

    var data = block.getData();
    var newData = data.merge(this.state);
    return setEditorState((0, _index.updateDataOfBlock)(getEditorState(), block, newData));
  };

  _class.prototype.dataForUpdate = function dataForUpdate() {
    var blockProps = this.props.blockProps;

    return blockProps.data.toJS();
  };

  _class.prototype.updateDataSelection = function updateDataSelection() {
    var _props2 = this.props,
        block = _props2.block,
        blockProps = _props2.blockProps;
    var getEditorState = blockProps.getEditorState,
        setEditorState = blockProps.setEditorState;

    var newselection = getEditorState().getSelection().merge({
      anchorKey: block.getKey(),
      focusKey: block.getKey()
    });

    return setEditorState(_draftJs.EditorState.forceSelection(getEditorState(), newselection));
  };

  _class.prototype.handleGrafFigureSelectImg = function handleGrafFigureSelectImg(e) {
    e.preventDefault();
    return this.setState({ selected: true }, this.updateDataSelection);
  };

  _class.prototype.classForImage = function classForImage() {
    if (this.state.embed_data.images) {
      return '';
    } else {
      return 'mixtapeImage--empty u-ignoreBlock';
    }
  };

  _class.prototype.render = function render() {
    var block = this.props.block;
    var _state = this.state,
        url = _state.url,
        caption = _state.caption;


    return _react2['default'].createElement(
      'div',
      { ref: 'image_tag2', suppressContentEditableWarning: true },
      _react2['default'].createElement(
        'div',
        { className: 'aspectRatioPlaceholder is-locked', onClick: this.handleGrafFigureSelectImg },
        _react2['default'].createElement('div', { style: { paddingBottom: '100%' }, className: 'aspect-ratio-fill' }),
        _react2['default'].createElement('img', { src: url, ref: 'image_tag', className: 'graf-image', contentEditable: false })
      ),
      _react2['default'].createElement(
        'figcaption',
        { className: 'imageCaption' },
        !block.getText().length && _react2['default'].createElement(
          'span',
          { className: 'danteDefaultPlaceholder' },
          caption
        ),
        _react2['default'].createElement(_draftJs.EditorBlock, (0, _assign2['default'])({}, this.props, {
          editable: true,
          className: 'imageCaption'
        }))
      )
    );
  };

  return _class;
}(_react.Component);

exports['default'] = _class;
module.exports = exports['default'];