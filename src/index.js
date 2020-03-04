/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import {
  MediaUpload,
  MediaPlaceholder,
  InnerBlocks,
  BlockControls,
  InspectorControls,
  ColorPalette
} from '@wordpress/block-editor';
import {
  Toolbar,
  IconButton,
  FocalPointPicker,
  PanelBody,
  PanelRow,
  SelectControl,
  Button,
} from '@wordpress/components';
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';


/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'mwd/background-image', {
  /**
   * This is the display title for your block, which can be translated with `i18n` functions.
   * The block inserter will show this name.
   */
  title: __( 'Background Image', 'create-block' ),

  /**
   * This is a short description for your block, can be translated with `i18n` functions.
   * It will be shown in the Block Tab in the Settings Sidebar.
   */
  description: __(
    '',
    'create-block'
  ),

  /**
   * Blocks are grouped into categories to help users browse and discover them.
   * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
   */
  category: 'widgets',

  /**
   * An icon property should be specified to make it easier to identify a block.
   * These can be any of WordPress’ Dashicons, or a custom svg element.
   */
  icon: 'format-image',

  /**
   * Optional block extended support features.
   */
  supports: {
    // Removes support for an HTML mode.
    html: false,
    align:
      ["left","wide","full"],
  },
  attributes: {
    image: {
      type: 'object'
    },
    focalPoint: {
      type: 'object'
    },
    repeat: {
      type: 'string',
      default: 'no-repeat'
    },
    size: {
      type: 'string',
      default: 'auto'
    },
    backgroundColor: {
      type: 'string',
      default: 'transparent',
    }
  },

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
   *
   * @param {Object} [props] Properties passed from the editor.
   *
   * @return {WPElement} Element to render.
   */
  edit( { className, attributes, setAttributes } ) {
    const { image, focalPoint, repeat, size, backgroundColor } = attributes;

    const handleImage = image => {
      setAttributes({ image });
    };

    const style = {
      backgroundRepeat: repeat,
      backgroundSize: size,
      backgroundColor: backgroundColor,
      backgroundPosition: (typeof focalPoint != "undefined" ) ?  `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : ``,
      backgroundImage: (typeof image != "undefined" ) ? `url(${image.url})` : ``
    };

    return (
      <div className={ className } style={ style }>
      <BlockControls>
        <Toolbar>
          <MediaUpload
            onSelect={handleImage}
            allowedTypes={['image']}
            render={({ open }) => (
              <IconButton
                className="components-toolbar__control"
                label={__('Edit media')}
                icon="edit"
                onClick={open}
              />
            )}
          />
        </Toolbar>
      </BlockControls>
      { !! image && (
      <InspectorControls>
					<PanelBody title={ __( 'Media settings' ) } initialOpen={true}>
              <FocalPointPicker
                label={ __( 'Background Position' ) }
                url={ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAEsCAYAAAA1u0HIAAAFeUlEQVR4nO3XIa6sWhRF0csPPUXhqik4FK0ENN+WInkOZo3RgpOzxMwe9uO8/gCAV/vPfADwfoIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGjEe9N8+fJz4N/sq2LD4MoFzoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQM+3FehgSAd3OhA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAwGjEe9P8efLzAH7Wti7G/+JCB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4CAYT/Oy5AA8G4udAAIEHQACBB0AAgQdAAIEHQACBB0AAgQdAAIEHQACBB0AAgQdAAIEHQACBB0AAgQdAAIGI14b5o/T34ewM/a1sX4X1zoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAw7Md5GRIA3s2FDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGjEe9N8+fJzwP4Wdu6GP+LCx0AAgQdAAIEHQACBB0AAgQdAAIEHQACBB0AAgQdAAIEHQACBB0AAob9OC9DAsC7udABIEDQASBA0AEgQNABIEDQASBA0AEgQNABIEDQASBA0AEgQNABIEDQASBA0AEgQNABIGA04r1p/jz5eQA/a1sX439xoQNAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAwLAf52VIAHg3FzoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAEjEa8N82fJz8P4Gdt62L8Ly50AAgQdAAIEHQACBB0AAgQdAAIEHQACBB0AAgQdAAIEHQACBB0AAgY9uO8DAkA7+ZCB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4CA0Yj3pvnz5OcB/KxtXYz/xYUOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAGCDgABgg4AAYIOAAHDfpyXIQHg3VzoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAEDAa8d40f578PICfta2L8b+40AEgQNABIEDQASBA0AEgQNABIEDQASBA0AEgQNABIEDQASBA0AEgYNiP8zIkALybCx0AAgQdAAIEHQACBB0AAgQdAAIEHQACBB0AAgQdAAIEHQACBB0AAgQdAAIEHQACBB0AAkYj3pvmz5OfB/CztnUx/hcXOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAEDPtxXoYEgHdzoQNAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADwNv9/f39D28gQ+9UPwDbAAAAAElFTkSuQmCC" }
                value={ focalPoint }
                onChange={ ( newFocalPoint ) =>
                  setAttributes( {
                    focalPoint: newFocalPoint,
                  } )
                }
              />
						<PanelRow>
							<Button
								isSecondary
								isSmall
								className="block-library-backgroundimage__reset-button"
								onClick={ () =>
									setAttributes( {
										image: undefined,
										backgroundType: undefined,
										focalPoint: undefined,
									} )
								}
							>
								{ __( 'Clear Media' ) }
							</Button>
						</PanelRow>
            <SelectControl
              label="Repeat"
              help="If and how this background should repeat."
              value={repeat}
              options={[
                { label: "Repeat", value: "repeat" },
                { label: "Repeat Horizontally", value: "repeat-x" },
                { label: "Repeat Vertically", value: "repeat-y" },
                { label: "No Repeat", value: "no-repeat" },
                { label: "Space", value: "space" },
                { label: "Round", value: "round" },
              ]}
              onChange={value => {
                setAttributes({ repeat: value });
              }}
            />
            <SelectControl
              label="Size"
              help="Background size."
              value={size}
              options={[
                { label: "Auto", value: "auto" },
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "contain" },
              ]}
              onChange={value => {
                setAttributes({ size: value });
              }}
            />
          </PanelBody>
					<PanelBody title={ __( 'Color settings' ) } isnitialOpen={false}>
            <label className="blocks-base-control__label">Background Color</label>
            <ColorPalette
              value={ backgroundColor }
              onChange={ value => {
                setAttributes({backgroundColor: value})
              }}
            />
          </PanelBody>
        </InspectorControls>
				)}
      {image && image.url ? (
            <div />
          ) : (
            <MediaPlaceholder onSelect={handleImage} />
          )}
        <InnerBlocks />
      </div>
    );
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by the block editor into `post_content`.
   *
   * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
   *
   * @return {WPElement} Element to render.
   */
  save({ attributes }) {
    const styleSave = {
      backgroundRepeat: attributes.repeat,
      backgroundSize: attributes.size,
      backgroundImage: `url(${attributes.image.url})`,
      backgroundPosition: (attributes.focalPoint) ? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y * 100 }%` : '',
      backgroundColor: attributes.backgroundColor
    };

    return (
      <div style={ styleSave }>
        <InnerBlocks.Content />
      </div>
    );
  },
} );
