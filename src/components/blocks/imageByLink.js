import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Entity, RichUtils, AtomicBlockUtils, EditorBlock, EditorState } from 'draft-js';

import { updateDataOfBlock } from '../../model/index.js';

export default class extends Component {
  constructor(props) {
    super(props);

    const { block, blockProps } = this.props;
    const { direction, url } = block.getData().toJS();
    this.config = blockProps.config;

    this.updateData = this.updateData.bind(this);
    this.dataForUpdate = this.dataForUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateDataSelection = this.updateDataSelection.bind(this);
    this.handleGrafFigureSelectImg = this.handleGrafFigureSelectImg.bind(this);

    this.state = {
      caption: this.config.imageCaptionPlaceholder,
      direction: direction || 'center',
      selected: false, // probably unused
      url,
    };
  }

  componentDidMount() {
    const { blockProps } = this.props;
    if (!blockProps.data) {
      return;
    }
    const { provisory_text: url } = this.dataForUpdate();
    if (url) {
      this.setState({ url, provisory_text: '' }, this.updateData);
    }
  }

  updateData() {
    const { block, blockProps } = this.props;
    const { getEditorState, setEditorState } = blockProps;
    const data = block.getData();
    const newData = data.merge(this.state);
    return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
  }

  dataForUpdate() {
    const { blockProps } = this.props;
    return blockProps.data.toJS();
  }

  updateDataSelection() {
    const { block, blockProps } = this.props;
    const { getEditorState, setEditorState } = blockProps;
    const newselection = getEditorState()
      .getSelection()
      .merge({
        anchorKey: block.getKey(),
        focusKey: block.getKey(),
      });

    return setEditorState(EditorState.forceSelection(getEditorState(), newselection));
  }

  handleGrafFigureSelectImg(e) {
    e.preventDefault();
    return this.setState({ selected: true }, this.updateDataSelection);
  }

  classForImage() {
    if (this.state.embed_data.images) {
      return '';
    } else {
      return 'mixtapeImage--empty u-ignoreBlock';
    }
  }

  render() {
    const { block } = this.props;
    const { url, caption } = this.state;

    return (
      <div ref="image_tag2" suppressContentEditableWarning={true}>
        <div className="aspectRatioPlaceholder is-locked" onClick={this.handleGrafFigureSelectImg}>
          <div style={{ paddingBottom: '100%' }} className="aspect-ratio-fill" />
          <img src={url} ref="image_tag" className="graf-image" contentEditable={false} />
        </div>
        <figcaption className="imageCaption">
          {!block.getText().length && <span className="danteDefaultPlaceholder">{caption}</span>}
          <EditorBlock
            {...Object.assign({}, this.props, {
              editable: true,
              className: 'imageCaption',
            })}
          />
        </figcaption>
      </div>
    );
  }
}
