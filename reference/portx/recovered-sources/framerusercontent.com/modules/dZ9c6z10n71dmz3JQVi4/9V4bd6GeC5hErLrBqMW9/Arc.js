import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";import{addPropertyControls,ControlType,RenderTarget,withCSS}from"framer";import hash from"@emotion/hash";function getAlignmentIcon(alignmentBaseline){switch(alignmentBaseline){case"top":return"Text Top";case"center":return"Central";case"bottom":return"Hanging";}}/**
 * ARC TEXT FOR INSERT
 * By Adam and Benjamin
 *
 * @framerIntrinsicWidth 150
 * @framerIntrinsicHeight 150
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */const Arc=withCSS(function Arc(_props){const props={..._props,width:_props.width??50,height:_props.height??50};// Checks
const isCanvas=RenderTarget.current()===RenderTarget.canvas;// For Ellipse
const isEllipse=!props.type;const cylinder=isEllipse?props.cylinderHeight/2:0;// Base arc path
const path=createPath(props.flip,cylinder);// Unique IDs to avoid multiple instances on the canvas sharing a single path
const id=`curve-${hash(path)}`;// Alignment icon conversion
const alignmentValue=getAlignmentIcon(props.alignmentBaseline);return /*#__PURE__*/_jsxs("svg",{className:"transform-origin-center-center",style:{width:"100%",height:"100%",transformOrigin:"center"},viewBox:`0 0 100 100`,overflow:"visible",children:[/*#__PURE__*/_jsx("path",{id:id,d:path,strokeWidth:"none",fill:"transparent"}),/*#__PURE__*/_jsx("text",{children:/*#__PURE__*/_jsx("textPath",{href:`#${id}`,startOffset:props.startOffset,dominantBaseline:alignmentValue,style:{letterSpacing:props.font?.letterSpacing?props.font.letterSpacing:1.85,...props.font,fill:props.color},children:props.text})})]});},// Work around a bug with framer-motion that calculates a px origin when animating SVG elements.
[".transform-origin-center-center { transform-origin: center center !important; }"],"framer-arc-text");export default Arc;addPropertyControls(Arc,{text:{title:"Content",type:ControlType.String,defaultValue:"DESIGN SITES LIKE A PRO WITH FRAMER",displayTextArea:true},type:{title:"Type",type:ControlType.Boolean,enabledTitle:"Circle",disabledTitle:"Ellipse",defaultValue:true},cylinderHeight:{title:"Height",type:ControlType.Number,min:0,max:1e3,displayStepper:true,hidden:props=>props.type},alignmentBaseline:{title:"Align",type:ControlType.Enum,options:["top","center","bottom"],optionIcons:["align-top","align-middle","align-bottom"],defaultValue:"bottom",displaySegmentedControl:true},flip:{type:ControlType.Boolean,defaultValue:false,title:"Direction",enabledTitle:"CW",disabledTitle:"CCW"},startOffset:{title:"Offset",type:ControlType.Number,defaultValue:0,max:360,unit:"\xb0",step:.5},font:{type:ControlType.Font,title:"Font",controls:"extended",displayTextAlignment:false},color:{title:"Color",type:ControlType.Color,defaultValue:"#999"}});/* Path creation method */const createPath=(flip,cylinder)=>{const cylinderTop=50-cylinder;const cylinderBottom=50+cylinder;return!flip?`M 0 50 L 0 ${cylinderTop} A 1 1 0 0 1 100 ${cylinderTop} L 100 50 L 100 ${cylinderBottom} A 1 1 0 0 1 0 ${cylinderBottom} L 0 ${cylinderTop}`:`M 0 50 L 0 ${cylinderBottom} A 1 1 0 1 0 100 ${cylinderBottom} L 100 ${cylinderTop} A 1 1 0 1 0 0 ${cylinderTop} L 0 50`;};
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"Arc","slots":[],"annotations":{"framerContractVersion":"1","framerSupportedLayoutWidth":"fixed","framerDisableUnlink":"*","framerIntrinsicHeight":"150","framerIntrinsicWidth":"150","framerSupportedLayoutHeight":"fixed"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Arc.map