import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";import{useState}from"react";import{addPropertyControls,ControlType}from"framer";import{motion}from"framer-motion";// --- Helper Functions ---
const uuidv4=()=>{return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,c=>{const r=Math.random()*16|0;const v=c==="x"?r:r&3|8;return v.toString(16);});};// --- Component ---
/**
 * @framerIntrinsicWidth 200
 * @framerIntrinsicHeight 50
 * @framerDisableUnlink
 */export default function RollingText({text,transition,stagger,reverse,font,color,textTransform,tag,padding}){const[isHovered,setIsHovered]=useState(false);const innerClassName=`rolling-text-inner-${uuidv4()}`;const Tag=tag;const fontSizeStr=font?.fontSize??"16px";const letterSpacingStr=font?.letterSpacing??"0px";const rawLineHeight=font?.lineHeight;const fontFamily=font?.fontFamily??"Inter";const fontSizeNum=parseInt(fontSizeStr,10)||16;let absoluteLineHeightPx;if(typeof rawLineHeight==="number"){absoluteLineHeightPx=fontSizeNum*rawLineHeight;}else if(typeof rawLineHeight==="string"&&rawLineHeight.includes("em")){const emValue=parseFloat(rawLineHeight)||1.2;absoluteLineHeightPx=fontSizeNum*emValue;}else if(typeof rawLineHeight==="string"){const pxValue=parseFloat(rawLineHeight);absoluteLineHeightPx=isNaN(pxValue)?rawLineHeight:`${pxValue}px`;}else{absoluteLineHeightPx=fontSizeNum*1.2;}const absoluteLineHeightStr=typeof absoluteLineHeightPx==="number"?`${absoluteLineHeightPx}px`:absoluteLineHeightPx;const yOffset=`-${absoluteLineHeightStr}`;const styles=`
    .${innerClassName} {
      --font-size: ${fontSizeStr};
      --text: ${color};
      --line-height-abs: ${absoluteLineHeightStr};
      box-sizing: border-box; margin: 0; padding: 0; vertical-align: top;
      display: flex; overflow: hidden; width: max-content;
      font-family: ${fontFamily}; font-size: ${fontSizeStr};
      text-transform: ${textTransform}; user-select: none;
      text-shadow: 0 var(--line-height-abs) 0 var(--text);
    }
    .${innerClassName} span {
      display: block; -webkit-backface-visibility: hidden; backface-visibility: hidden;
      white-space: pre; flex-shrink: 0;
      font-family: inherit; font-weight: inherit; font-style: inherit;
      font-size: inherit; letter-spacing: inherit;
      line-height: ${rawLineHeight??1.2};
      color: var(--text);
    }
  `;const wrapperStyle={display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",overflow:"hidden",padding:padding,boxSizing:"border-box"};const spanVariants={initial:{y:"0%"},hover:{y:yOffset}};const baseDuration=typeof transition?.duration==="number"?transition.duration:.5;// Convert stagger percentage (0-100) to a factor (0-1)
const staggerFactor=stagger/100;return /*#__PURE__*/_jsxs("div",{style:wrapperStyle,onMouseEnter:()=>setIsHovered(true),onMouseLeave:()=>setIsHovered(false),children:[/*#__PURE__*/_jsx(Tag,{className:innerClassName,children:[...text].map((str,index)=>{const charIndex=reverse?text.length-1-index:index;// Apply staggerFactor to the delay calculation
const delay=text.length>0?baseDuration/text.length*charIndex*staggerFactor// Multiply by factor
:0;const motionSpanStyle={display:"block",...font};return /*#__PURE__*/_jsx(motion.span,{variants:spanVariants,initial:"initial",animate:isHovered?"hover":"initial",transition:{...transition,delay:delay},style:motionSpanStyle,children:str===" "?"\xa0":str},index);})}),/*#__PURE__*/_jsx("style",{children:styles})]});}// --- Component Display Name ---
RollingText.displayName="Rolling Text";// --- Default Properties ---
const defaultFont={fontFamily:"Inter",fontWeight:"400",fontSize:"16px",fontStyle:"normal",letterSpacing:"0px",lineHeight:1.2};const defaultTransition={type:"spring",duration:.4,bounce:0};// --- Framer Property Controls ---
addPropertyControls(RollingText,{text:{type:ControlType.String,title:"Text",defaultValue:"Rolling Text"},font:{type:ControlType.Font,title:"Font",controls:"extended",defaultValue:defaultFont},color:{type:ControlType.Color,title:"Color",defaultValue:"#808080"},transition:{type:ControlType.Transition,title:"Transition",defaultValue:defaultTransition},// Added Stagger control
stagger:{title:"Stagger",type:ControlType.Number,min:0,max:100,step:1,defaultValue:35,unit:"%"},padding:{title:"Padding",type:ControlType.Padding,defaultValue:"0px"},reverse:{type:ControlType.Boolean,title:"Reverse",defaultValue:false,enabledTitle:"Yes",disabledTitle:"No"},textTransform:{title:"Transform",type:ControlType.Enum,defaultValue:"none",options:["none","uppercase","lowercase","capitalize"],optionTitles:["None","Uppercase","Lowercase","Capitalize"]},tag:{type:ControlType.Enum,title:"Tag",options:["p","span","h1","h2","h3","h4","h5","h6"],optionTitles:["p","span","h1","h2","h3","h4","h5","h6"],defaultValue:"p",description:"More components at [Framer University](https://frameruni.link/cc)."}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"RollingText","slots":[],"annotations":{"framerIntrinsicHeight":"50","framerDisableUnlink":"","framerIntrinsicWidth":"200","framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./RollingTextHover_Prod.map