/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview An object that owns a block's rendering SVG elements.
 * @author fenichel@google.com (Rachel Fenichel)
 */

'use strict';

goog.provide('Blockly.blockRendering.PathObject');

goog.require('Blockly.blockRendering.IPathObject');
goog.require('Blockly.Theme');
goog.require('Blockly.utils.dom');


/**
 * An object that handles creating and setting each of the SVG elements
 * used by the renderer.
 * @param {!SVGElement} root The root SVG element.
 * @constructor
 * @implements {Blockly.blockRendering.IPathObject}
 * @package
 */
Blockly.blockRendering.PathObject = function(root) {
  this.svgRoot = root;

  /**
   * The primary path of the block.
   * @type {SVGElement}
   * @package
   */
  this.svgPath = Blockly.utils.dom.createSvgElement('path',
      {'class': 'blocklyPath'}, this.svgRoot);

  // The light and dark paths need to exist (for now) because there is colouring
  // code in block_svg that depends on them.  But we will always set them to
  // display: none, and eventually we want to remove them entirely.

  /**
   * The light path of the block.
   * @type {SVGElement}
   * @package
   */
  this.svgPathLight = Blockly.utils.dom.createSvgElement('path',
      {'class': 'blocklyPathLight'}, this.svgRoot);

  /**
   * The style object to use when colouring block paths.
   * @type {!Blockly.Theme.BlockStyle}
   * @public
   */
  this.style = Blockly.Theme.createBlockStyle('#0000000');
};

/**
 * Set the path generated by the renderer onto the respective SVG element.
 * @param {string} pathString The path.
 * @package
 */
Blockly.blockRendering.PathObject.prototype.setPaths = function(pathString) {
  this.svgPath.setAttribute('d', pathString);
  this.svgPathLight.style.display = 'none';
};

/**
 * Flip the SVG paths in RTL.
 * @package
 */
Blockly.blockRendering.PathObject.prototype.flipRTL = function() {
  // Mirror the block's path.
  this.svgPath.setAttribute('transform', 'scale(-1 1)');
};

/**
 * Apply the stored colours to the block's path, taking into account whether
 * the paths belong to a shadow block.
 * @param {boolean} isShadow True if the block is a shadow block.
 * @package
 */
Blockly.blockRendering.PathObject.prototype.applyColour = function(isShadow) {
  if (isShadow) {
    this.svgPath.setAttribute('stroke', 'none');
    this.svgPath.setAttribute('fill', this.style.colourSecondary);
  } else {
    this.svgPath.setAttribute('stroke', this.style.colourTertiary);
    this.svgPath.setAttribute('fill', this.style.colourPrimary);
  }
};

/**
 * Set the style.
 * @param {!Blockly.Theme.BlockStyle} blockStyle The block style to use.
 * @package
 */
Blockly.blockRendering.PathObject.prototype.setStyle = function(blockStyle) {
  this.style = blockStyle;
};
