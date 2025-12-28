import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{r as t}from"./index-CC6F48bw.js";function me(e,r){typeof e=="function"?e(r):e!=null&&(e.current=r)}function pe(...e){return r=>e.forEach(s=>me(s,r))}function he(e){return t.isValidElement(e)}const B=t.forwardRef((e,r)=>{const{children:s,...n}=e;return he(s)?o.jsx(se,{...n,ref:r,children:s}):null});B.displayName="Slot";const se=t.forwardRef((e,r)=>{const{children:s,...n}=e;if(!t.isValidElement(s))return null;const a=s.ref;return t.cloneElement(s,{...fe(n,s.props),ref:r?pe(r,a):a})});se.displayName="SlotClone";function fe(e,r){const s={...r};for(const n in r){const a=e[n],i=r[n];/^on[A-Z]/.test(n)?a&&i?s[n]=(...c)=>{i(...c),a(...c)}:a&&(s[n]=a):n==="style"?s[n]={...a,...i}:n==="className"&&(s[n]=[a,i].filter(Boolean).join(" "))}return{...e,...s}}const oe=t.createContext(null);function ne(){const e=t.useContext(oe);if(!e)throw new Error("Button compound components must be used within Button.Root");return e}const ae=t.forwardRef(({children:e,disabled:r=!1,size:s="md",asChild:n,className:a,...i},c)=>{const ue=n?B:"button";return o.jsx(oe.Provider,{value:{disabled:r,size:s},children:o.jsx(ue,{ref:c,disabled:r,"data-disabled":r?"":void 0,"data-size":s,className:a,...i,children:e})})});ae.displayName="Button.Root";const te=t.forwardRef(({children:e,asChild:r,className:s,...n},a)=>{const{size:i}=ne();return o.jsx(r?B:"span",{ref:a,"data-size":i,"data-slot":"icon",className:s,...n,children:e})});te.displayName="Button.Icon";const ie=t.forwardRef(({children:e,asChild:r,className:s,...n},a)=>{const{size:i}=ne();return o.jsx(r?B:"span",{ref:a,"data-size":i,"data-slot":"label",className:s,...n,children:e})});ie.displayName="Button.Label";const w={Root:ae,Icon:te,Label:ie},ge="_button_k0n5m_1",ye="_primary_k0n5m_57",ve="_secondary_k0n5m_68",xe="_ghost_k0n5m_80",L={button:ge,primary:ye,secondary:ve,ghost:xe},z=t.forwardRef(({variant:e="primary",className:r,...s},n)=>{const a=L[e],i=[L.button,a,r].filter(Boolean).join(" ");return o.jsx(w.Root,{ref:n,className:i,...s})});z.displayName="Button";const l=Object.assign(z,{Icon:w.Icon,Label:w.Label});z.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{defaultValue:{value:'"primary"',computed:!1},required:!1}}};const le=t.forwardRef(({size:e=24,color:r="currentColor",children:s,...n},a)=>o.jsx("svg",{ref:a,width:e,height:e,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:r,...n,children:s}));le.displayName="Icon";const j=t.forwardRef(({size:e=24,color:r="currentColor",...s},n)=>o.jsxs("svg",{ref:n,width:e,height:e,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s,children:[o.jsx("path",{d:"M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),o.jsx("path",{d:"M9 22V12H15V22",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}));j.displayName="IconHome";const I=t.forwardRef(({size:e=24,color:r="currentColor",...s},n)=>o.jsxs("svg",{ref:n,width:e,height:e,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s,children:[o.jsx("circle",{cx:"11",cy:"11",r:"8",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),o.jsx("path",{d:"M21 21L16.65 16.65",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}));I.displayName="IconSearch";const ce=t.forwardRef(({size:e=24,color:r="currentColor",...s},n)=>o.jsxs("svg",{ref:n,width:e,height:e,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s,children:[o.jsx("path",{d:"M18 6L6 18",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),o.jsx("path",{d:"M6 6L18 18",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}));ce.displayName="IconClose";const de=t.forwardRef(({size:e=24,color:r="currentColor",...s},n)=>o.jsx("svg",{ref:n,width:e,height:e,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s,children:o.jsx("path",{d:"M6 9L12 15L18 9",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}));de.displayName="IconChevronDown";le.__docgenInfo={description:"",methods:[],displayName:"Icon",props:{size:{defaultValue:{value:"24",computed:!1},required:!1},color:{defaultValue:{value:'"currentColor"',computed:!1},required:!1}}};de.__docgenInfo={description:"",methods:[],displayName:"IconChevronDown",props:{size:{defaultValue:{value:"24",computed:!1},required:!1},color:{defaultValue:{value:'"currentColor"',computed:!1},required:!1}}};ce.__docgenInfo={description:"",methods:[],displayName:"IconClose",props:{size:{defaultValue:{value:"24",computed:!1},required:!1},color:{defaultValue:{value:'"currentColor"',computed:!1},required:!1}}};j.__docgenInfo={description:"",methods:[],displayName:"IconHome",props:{size:{defaultValue:{value:"24",computed:!1},required:!1},color:{defaultValue:{value:'"currentColor"',computed:!1},required:!1}}};I.__docgenInfo={description:"",methods:[],displayName:"IconSearch",props:{size:{defaultValue:{value:"24",computed:!1},required:!1},color:{defaultValue:{value:'"currentColor"',computed:!1},required:!1}}};const ze={title:"Components/Button",component:l,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost"],description:"Button visual variant"},size:{control:"select",options:["sm","md","lg"],description:"Button size"},disabled:{control:"boolean",description:"Disabled state"}}},d={args:{variant:"primary",size:"md",children:"Primary Button"}},u={args:{variant:"secondary",size:"md",children:"Secondary Button"}},m={args:{variant:"ghost",size:"md",children:"Ghost Button"}},p={args:{variant:"primary",size:"sm",children:"Small Button"}},h={args:{variant:"primary",size:"lg",children:"Large Button"}},f={args:{variant:"primary",size:"md",disabled:!0,children:"Disabled Button"}},g={render:e=>o.jsxs(l,{...e,children:[o.jsx(l.Icon,{children:o.jsx(j,{size:20})}),o.jsx(l.Label,{children:"Home"})]}),args:{variant:"primary",size:"md"}},y={render:e=>o.jsx(l,{...e,children:o.jsx(l.Icon,{children:o.jsx(I,{size:20})})}),args:{variant:"ghost",size:"md","aria-label":"Search"}},v={render:()=>o.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[o.jsx(l,{variant:"primary",children:"Primary"}),o.jsx(l,{variant:"secondary",children:"Secondary"}),o.jsx(l,{variant:"ghost",children:"Ghost"})]})},x={render:()=>o.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[o.jsx(l,{size:"sm",children:"Small"}),o.jsx(l,{size:"md",children:"Medium"}),o.jsx(l,{size:"lg",children:"Large"})]})};var k,S,b;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    size: "md",
    children: "Primary Button"
  }
}`,...(b=(S=d.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var N,C,_;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    variant: "secondary",
    size: "md",
    children: "Secondary Button"
  }
}`,...(_=(C=u.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};var V,R,q;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    variant: "ghost",
    size: "md",
    children: "Ghost Button"
  }
}`,...(q=(R=m.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var E,W,M;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    size: "sm",
    children: "Small Button"
  }
}`,...(M=(W=p.parameters)==null?void 0:W.docs)==null?void 0:M.source}}};var D,H,P;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    size: "lg",
    children: "Large Button"
  }
}`,...(P=(H=h.parameters)==null?void 0:H.docs)==null?void 0:P.source}}};var G,A,O;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    size: "md",
    disabled: true,
    children: "Disabled Button"
  }
}`,...(O=(A=f.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var Z,$,T;g.parameters={...g.parameters,docs:{...(Z=g.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: args => <Button {...args}>
      <Button.Icon>
        <IconHome size={20} />
      </Button.Icon>
      <Button.Label>Home</Button.Label>
    </Button>,
  args: {
    variant: "primary",
    size: "md"
  }
}`,...(T=($=g.parameters)==null?void 0:$.docs)==null?void 0:T.source}}};var F,J,K;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <Button {...args}>
      <Button.Icon>
        <IconSearch size={20} />
      </Button.Icon>
    </Button>,
  args: {
    variant: "ghost",
    size: "md",
    "aria-label": "Search"
  }
}`,...(K=(J=y.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,X;v.parameters={...v.parameters,docs:{...(Q=v.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "16px",
    alignItems: "center"
  }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
}`,...(X=(U=v.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,ee,re;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "16px",
    alignItems: "center"
  }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
}`,...(re=(ee=x.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};const je=["Primary","Secondary","Ghost","Small","Large","Disabled","WithIcon","IconOnly","AllVariants","AllSizes"];export{x as AllSizes,v as AllVariants,f as Disabled,m as Ghost,y as IconOnly,h as Large,d as Primary,u as Secondary,p as Small,g as WithIcon,je as __namedExportsOrder,ze as default};
