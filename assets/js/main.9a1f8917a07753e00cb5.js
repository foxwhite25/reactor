(()=>{var t={236:function(t,e){!function(t){"use strict";var e=function(t){return function(e){var r=t(e);return e.add(r),r}},r=function(t){return function(e,r){return t.set(e,r),r}},n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,o=536870912,i=2*o,s=function(t,e){return function(r){var s=e.get(r),u=void 0===s?r.size:s<i?s+1:0;if(!r.has(u))return t(r,u);if(r.size<o){for(;r.has(u);)u=Math.floor(Math.random()*i);return t(r,u)}if(r.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;r.has(u);)u=Math.floor(Math.random()*n);return t(r,u)}},u=new WeakMap,a=r(u),c=s(a,u),l=e(c);t.addUniqueNumber=l,t.generateUniqueNumber=c,Object.defineProperty(t,"__esModule",{value:!0})}(e)},446:t=>{"use strict";t.exports=function(t,e,r){if(null==t||null==e)return t;var n=String(t),o="number"==typeof e?e:parseInt(e,10);if(isNaN(o)||!isFinite(o))return n;var i=n.length;if(i>=o)return n;var s=null==r?"":String(r);""===s&&(s=" ");for(var u=o-i;s.length<u;)s+=s;return n+(s.length>u?s.substr(0,u):s)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";r.d({},{hM:()=>G});const t=new Map,e=e=>{const r=t.get(e);if(r)return r;const n=document.getElementById(e);if(!n)throw new TypeError(`Element with id "${e}" was not found on page?`);return t.set(e,n),n};var n=r(446),o=r.n(n),i=9e15,s=function(){for(var t=[],e=-323;e<=308;e++)t.push(Number("1e"+e));return function(e){return t[e+323]}}(),u=function(t){return t instanceof h?t:new h(t)},a=function(t,e){return(new h).fromMantissaExponent(t,e)},c=function(t,e){return(new h).fromMantissaExponent_noNormalize(t,e)};function l(t,e,r,n){var o=e.mul(r.pow(n));return h.floor(t.div(o).mul(r.sub(1)).add(1).log10()/r.log10())}function p(t,e,r,n){return e.mul(r.pow(n)).mul(h.sub(1,r.pow(t))).div(h.sub(1,r))}var h=function(){function t(e){this.mantissa=NaN,this.exponent=NaN,void 0===e?(this.m=0,this.e=0):e instanceof t?this.fromDecimal(e):"number"==typeof e?this.fromNumber(e):this.fromString(e)}return Object.defineProperty(t.prototype,"m",{get:function(){return this.mantissa},set:function(t){this.mantissa=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"e",{get:function(){return this.exponent},set:function(t){this.exponent=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"s",{get:function(){return this.sign()},set:function(t){if(0===t)return this.e=0,void(this.m=0);this.sgn()!==t&&(this.m=-this.m)},enumerable:!1,configurable:!0}),t.fromMantissaExponent=function(e,r){return(new t).fromMantissaExponent(e,r)},t.fromMantissaExponent_noNormalize=function(e,r){return(new t).fromMantissaExponent_noNormalize(e,r)},t.fromDecimal=function(e){return(new t).fromDecimal(e)},t.fromNumber=function(e){return(new t).fromNumber(e)},t.fromString=function(e){return(new t).fromString(e)},t.fromValue=function(e){return(new t).fromValue(e)},t.fromValue_noAlloc=function(e){return e instanceof t?e:new t(e)},t.abs=function(t){return u(t).abs()},t.neg=function(t){return u(t).neg()},t.negate=function(t){return u(t).neg()},t.negated=function(t){return u(t).neg()},t.sign=function(t){return u(t).sign()},t.sgn=function(t){return u(t).sign()},t.round=function(t){return u(t).round()},t.floor=function(t){return u(t).floor()},t.ceil=function(t){return u(t).ceil()},t.trunc=function(t){return u(t).trunc()},t.add=function(t,e){return u(t).add(e)},t.plus=function(t,e){return u(t).add(e)},t.sub=function(t,e){return u(t).sub(e)},t.subtract=function(t,e){return u(t).sub(e)},t.minus=function(t,e){return u(t).sub(e)},t.mul=function(t,e){return u(t).mul(e)},t.multiply=function(t,e){return u(t).mul(e)},t.times=function(t,e){return u(t).mul(e)},t.div=function(t,e){return u(t).div(e)},t.divide=function(t,e){return u(t).div(e)},t.recip=function(t){return u(t).recip()},t.reciprocal=function(t){return u(t).recip()},t.reciprocate=function(t){return u(t).reciprocate()},t.cmp=function(t,e){return u(t).cmp(e)},t.compare=function(t,e){return u(t).cmp(e)},t.eq=function(t,e){return u(t).eq(e)},t.equals=function(t,e){return u(t).eq(e)},t.neq=function(t,e){return u(t).neq(e)},t.notEquals=function(t,e){return u(t).notEquals(e)},t.lt=function(t,e){return u(t).lt(e)},t.lte=function(t,e){return u(t).lte(e)},t.gt=function(t,e){return u(t).gt(e)},t.gte=function(t,e){return u(t).gte(e)},t.max=function(t,e){return u(t).max(e)},t.min=function(t,e){return u(t).min(e)},t.clamp=function(t,e,r){return u(t).clamp(e,r)},t.clampMin=function(t,e){return u(t).clampMin(e)},t.clampMax=function(t,e){return u(t).clampMax(e)},t.cmp_tolerance=function(t,e,r){return u(t).cmp_tolerance(e,r)},t.compare_tolerance=function(t,e,r){return u(t).cmp_tolerance(e,r)},t.eq_tolerance=function(t,e,r){return u(t).eq_tolerance(e,r)},t.equals_tolerance=function(t,e,r){return u(t).eq_tolerance(e,r)},t.neq_tolerance=function(t,e,r){return u(t).neq_tolerance(e,r)},t.notEquals_tolerance=function(t,e,r){return u(t).notEquals_tolerance(e,r)},t.lt_tolerance=function(t,e,r){return u(t).lt_tolerance(e,r)},t.lte_tolerance=function(t,e,r){return u(t).lte_tolerance(e,r)},t.gt_tolerance=function(t,e,r){return u(t).gt_tolerance(e,r)},t.gte_tolerance=function(t,e,r){return u(t).gte_tolerance(e,r)},t.log10=function(t){return u(t).log10()},t.absLog10=function(t){return u(t).absLog10()},t.pLog10=function(t){return u(t).pLog10()},t.log=function(t,e){return u(t).log(e)},t.log2=function(t){return u(t).log2()},t.ln=function(t){return u(t).ln()},t.logarithm=function(t,e){return u(t).logarithm(e)},t.pow10=function(t){return Number.isInteger(t)?c(1,t):a(Math.pow(10,t%1),Math.trunc(t))},t.pow=function(t,e){return"number"==typeof t&&10===t&&"number"==typeof e&&Number.isInteger(e)?c(1,e):u(t).pow(e)},t.exp=function(t){return u(t).exp()},t.sqr=function(t){return u(t).sqr()},t.sqrt=function(t){return u(t).sqrt()},t.cube=function(t){return u(t).cube()},t.cbrt=function(t){return u(t).cbrt()},t.dp=function(t){return u(t).dp()},t.decimalPlaces=function(t){return u(t).dp()},t.affordGeometricSeries=function(t,e,r,n){return l(u(t),u(e),u(r),n)},t.sumGeometricSeries=function(t,e,r,n){return p(t,u(e),u(r),n)},t.affordArithmeticSeries=function(t,e,r,n){return function(t,e,r,n){var o=e.add(n.mul(r)).sub(r.div(2)),i=o.pow(2);return o.neg().add(i.add(r.mul(t).mul(2)).sqrt()).div(r).floor()}(u(t),u(e),u(r),u(n))},t.sumArithmeticSeries=function(t,e,r,n){return function(t,e,r,n){var o=e.add(n.mul(r));return t.div(2).mul(o.mul(2).plus(t.sub(1).mul(r)))}(u(t),u(e),u(r),u(n))},t.efficiencyOfPurchase=function(t,e,r){return function(t,e,r){return t.div(e).add(t.div(r))}(u(t),u(e),u(r))},t.randomDecimalForTesting=function(t){if(20*Math.random()<1)return c(0,0);var e=10*Math.random();10*Math.random()<1&&(e=Math.round(e)),e*=Math.sign(2*Math.random()-1);var r=Math.floor(Math.random()*t*2)-t;return a(e,r)},t.prototype.normalize=function(){if(this.m>=1&&this.m<10)return this;if(0===this.m)return this.m=0,this.e=0,this;var t=Math.floor(Math.log10(Math.abs(this.m)));return this.m=-324===t?10*this.m/1e-323:this.m/s(t),this.e+=t,this},t.prototype.fromMantissaExponent=function(t,e){return isFinite(t)&&isFinite(e)?(this.m=t,this.e=e,this.normalize(),this):(t=Number.NaN,e=Number.NaN,this)},t.prototype.fromMantissaExponent_noNormalize=function(t,e){return this.m=t,this.e=e,this},t.prototype.fromDecimal=function(t){return this.m=t.m,this.e=t.e,this},t.prototype.fromNumber=function(t){return isNaN(t)?(this.m=Number.NaN,this.e=Number.NaN):t===Number.POSITIVE_INFINITY?(this.m=1,this.e=i):t===Number.NEGATIVE_INFINITY?(this.m=-1,this.e=i):0===t?(this.m=0,this.e=0):(this.e=Math.floor(Math.log10(Math.abs(t))),this.m=-324===this.e?10*t/1e-323:t/s(this.e),this.normalize()),this},t.prototype.fromString=function(t){if(-1!==t.indexOf("e")){var e=t.split("e");this.m=parseFloat(e[0]),this.e=parseFloat(e[1]),this.normalize()}else if("NaN"===t)this.m=Number.NaN,this.e=Number.NaN;else if(this.fromNumber(parseFloat(t)),isNaN(this.m))throw Error("[DecimalError] Invalid argument: "+t);return this},t.prototype.fromValue=function(e){return e instanceof t?this.fromDecimal(e):"number"==typeof e?this.fromNumber(e):"string"==typeof e?this.fromString(e):(this.m=0,this.e=0,this)},t.prototype.toNumber=function(){if(!isFinite(this.e))return Number.NaN;if(this.e>308)return this.m>0?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(this.e<-324)return 0;if(-324===this.e)return this.m>0?5e-324:-5e-324;var t=this.m*s(this.e);if(!isFinite(t)||this.e<0)return t;var e=Math.round(t);return Math.abs(e-t)<1e-10?e:t},t.prototype.mantissaWithDecimalPlaces=function(t){if(isNaN(this.m)||isNaN(this.e))return Number.NaN;if(0===this.m)return 0;var e=t+1,r=Math.ceil(Math.log10(Math.abs(this.m))),n=Math.round(this.m*Math.pow(10,e-r))*Math.pow(10,r-e);return parseFloat(n.toFixed(Math.max(e-r,0)))},t.prototype.toString=function(){return isNaN(this.m)||isNaN(this.e)?"NaN":this.e>=i?this.m>0?"Infinity":"-Infinity":this.e<=-i||0===this.m?"0":this.e<21&&this.e>-7?this.toNumber().toString():this.m+"e"+(this.e>=0?"+":"")+this.e},t.prototype.toExponential=function(t){if(isNaN(this.m)||isNaN(this.e))return"NaN";if(this.e>=i)return this.m>0?"Infinity":"-Infinity";if(this.e<=-i||0===this.m)return"0"+(t>0?o()(".",t+1,"0"):"")+"e+0";if(this.e>-324&&this.e<308)return this.toNumber().toExponential(t);isFinite(t)||(t=17);var e=t+1,r=Math.max(1,Math.ceil(Math.log10(Math.abs(this.m))));return(Math.round(this.m*Math.pow(10,e-r))*Math.pow(10,r-e)).toFixed(Math.max(e-r,0))+"e"+(this.e>=0?"+":"")+this.e},t.prototype.toFixed=function(t){return isNaN(this.m)||isNaN(this.e)?"NaN":this.e>=i?this.m>0?"Infinity":"-Infinity":this.e<=-i||0===this.m?"0"+(t>0?o()(".",t+1,"0"):""):this.e>=17?this.m.toString().replace(".","").padEnd(this.e+1,"0")+(t>0?o()(".",t+1,"0"):""):this.toNumber().toFixed(t)},t.prototype.toPrecision=function(t){return this.e<=-7?this.toExponential(t-1):t>this.e?this.toFixed(t-this.e-1):this.toExponential(t-1)},t.prototype.valueOf=function(){return this.toString()},t.prototype.toJSON=function(){return this.toString()},t.prototype.toStringWithDecimalPlaces=function(t){return this.toExponential(t)},t.prototype.abs=function(){return c(Math.abs(this.m),this.e)},t.prototype.neg=function(){return c(-this.m,this.e)},t.prototype.negate=function(){return this.neg()},t.prototype.negated=function(){return this.neg()},t.prototype.sign=function(){return Math.sign(this.m)},t.prototype.sgn=function(){return this.sign()},t.prototype.round=function(){return this.e<-1?new t(0):this.e<17?new t(Math.round(this.toNumber())):this},t.prototype.floor=function(){return this.e<-1?Math.sign(this.m)>=0?new t(0):new t(-1):this.e<17?new t(Math.floor(this.toNumber())):this},t.prototype.ceil=function(){return this.e<-1?Math.sign(this.m)>0?new t(1):new t(0):this.e<17?new t(Math.ceil(this.toNumber())):this},t.prototype.trunc=function(){return this.e<0?new t(0):this.e<17?new t(Math.trunc(this.toNumber())):this},t.prototype.add=function(t){var e,r,n=u(t);if(0===this.m)return n;if(0===n.m)return this;if(this.e>=n.e?(e=this,r=n):(e=n,r=this),e.e-r.e>17)return e;var o=Math.round(1e14*e.m+1e14*r.m*s(r.e-e.e));return a(o,e.e-14)},t.prototype.plus=function(t){return this.add(t)},t.prototype.sub=function(t){return this.add(u(t).neg())},t.prototype.subtract=function(t){return this.sub(t)},t.prototype.minus=function(t){return this.sub(t)},t.prototype.mul=function(e){if("number"==typeof e)return e<1e307&&e>-1e307?a(this.m*e,this.e):a(1e-307*this.m*e,this.e+307);var r="string"==typeof e?new t(e):e;return a(this.m*r.m,this.e+r.e)},t.prototype.multiply=function(t){return this.mul(t)},t.prototype.times=function(t){return this.mul(t)},t.prototype.div=function(t){return this.mul(u(t).recip())},t.prototype.divide=function(t){return this.div(t)},t.prototype.divideBy=function(t){return this.div(t)},t.prototype.dividedBy=function(t){return this.div(t)},t.prototype.recip=function(){return a(1/this.m,-this.e)},t.prototype.reciprocal=function(){return this.recip()},t.prototype.reciprocate=function(){return this.recip()},t.prototype.cmp=function(t){var e=u(t);if(0===this.m){if(0===e.m)return 0;if(e.m<0)return 1;if(e.m>0)return-1}if(0===e.m){if(this.m<0)return-1;if(this.m>0)return 1}if(this.m>0)return e.m<0||this.e>e.e?1:this.e<e.e?-1:this.m>e.m?1:this.m<e.m?-1:0;if(this.m<0)return e.m>0||this.e>e.e?-1:this.e<e.e||this.m>e.m?1:this.m<e.m?-1:0;throw Error("Unreachable code")},t.prototype.compare=function(t){return this.cmp(t)},t.prototype.eq=function(t){var e=u(t);return this.e===e.e&&this.m===e.m},t.prototype.equals=function(t){return this.eq(t)},t.prototype.neq=function(t){return!this.eq(t)},t.prototype.notEquals=function(t){return this.neq(t)},t.prototype.lt=function(t){var e=u(t);return 0===this.m?e.m>0:0===e.m?this.m<=0:this.e===e.e?this.m<e.m:this.m>0?e.m>0&&this.e<e.e:e.m>0||this.e>e.e},t.prototype.lte=function(t){return!this.gt(t)},t.prototype.gt=function(t){var e=u(t);return 0===this.m?e.m<0:0===e.m?this.m>0:this.e===e.e?this.m>e.m:this.m>0?e.m<0||this.e>e.e:e.m<0&&this.e<e.e},t.prototype.gte=function(t){return!this.lt(t)},t.prototype.max=function(t){var e=u(t);return this.lt(e)?e:this},t.prototype.min=function(t){var e=u(t);return this.gt(e)?e:this},t.prototype.clamp=function(t,e){return this.max(t).min(e)},t.prototype.clampMin=function(t){return this.max(t)},t.prototype.clampMax=function(t){return this.min(t)},t.prototype.cmp_tolerance=function(t,e){var r=u(t);return this.eq_tolerance(r,e)?0:this.cmp(r)},t.prototype.compare_tolerance=function(t,e){return this.cmp_tolerance(t,e)},t.prototype.eq_tolerance=function(e,r){var n=u(e);return t.lte(this.sub(n).abs(),t.max(this.abs(),n.abs()).mul(r))},t.prototype.equals_tolerance=function(t,e){return this.eq_tolerance(t,e)},t.prototype.neq_tolerance=function(t,e){return!this.eq_tolerance(t,e)},t.prototype.notEquals_tolerance=function(t,e){return this.neq_tolerance(t,e)},t.prototype.lt_tolerance=function(t,e){var r=u(t);return!this.eq_tolerance(r,e)&&this.lt(r)},t.prototype.lte_tolerance=function(t,e){var r=u(t);return this.eq_tolerance(r,e)||this.lt(r)},t.prototype.gt_tolerance=function(t,e){var r=u(t);return!this.eq_tolerance(r,e)&&this.gt(r)},t.prototype.gte_tolerance=function(t,e){var r=u(t);return this.eq_tolerance(r,e)||this.gt(r)},t.prototype.log10=function(){return this.e+Math.log10(this.m)},t.prototype.absLog10=function(){return this.e+Math.log10(Math.abs(this.m))},t.prototype.pLog10=function(){return this.m<=0||this.e<0?0:this.log10()},t.prototype.log=function(t){return Math.LN10/Math.log(t)*this.log10()},t.prototype.log2=function(){return 3.321928094887362*this.log10()},t.prototype.ln=function(){return 2.302585092994045*this.log10()},t.prototype.logarithm=function(t){return this.log(t)},t.prototype.pow=function(e){var r,n=e instanceof t?e.toNumber():e,o=this.e*n;if(Number.isSafeInteger(o)&&(r=Math.pow(this.m,n),isFinite(r)&&0!==r))return a(r,o);var i=Math.trunc(o),s=o-i;if(r=Math.pow(10,n*Math.log10(this.m)+s),isFinite(r)&&0!==r)return a(r,i);var u=t.pow10(n*this.absLog10());return-1===this.sign()?1===Math.abs(n%2)?u.neg():0===Math.abs(n%2)?u:new t(Number.NaN):u},t.prototype.pow_base=function(t){return u(t).pow(this)},t.prototype.factorial=function(){var e=this.toNumber()+1;return t.pow(e/Math.E*Math.sqrt(e*Math.sinh(1/e)+1/(810*Math.pow(e,6))),e).mul(Math.sqrt(2*Math.PI/e))},t.prototype.exp=function(){var e=this.toNumber();return-706<e&&e<709?t.fromNumber(Math.exp(e)):t.pow(Math.E,e)},t.prototype.sqr=function(){return a(Math.pow(this.m,2),2*this.e)},t.prototype.sqrt=function(){return this.m<0?new t(Number.NaN):this.e%2!=0?a(3.16227766016838*Math.sqrt(this.m),Math.floor(this.e/2)):a(Math.sqrt(this.m),Math.floor(this.e/2))},t.prototype.cube=function(){return a(Math.pow(this.m,3),3*this.e)},t.prototype.cbrt=function(){var t=1,e=this.m;e<0&&(t=-1,e=-e);var r=t*Math.pow(e,1/3),n=this.e%3;return a(1===n||-1===n?2.154434690031883*r:0!==n?4.641588833612778*r:r,Math.floor(this.e/3))},t.prototype.sinh=function(){return this.exp().sub(this.negate().exp()).div(2)},t.prototype.cosh=function(){return this.exp().add(this.negate().exp()).div(2)},t.prototype.tanh=function(){return this.sinh().div(this.cosh())},t.prototype.asinh=function(){return t.ln(this.add(this.sqr().add(1).sqrt()))},t.prototype.acosh=function(){return t.ln(this.add(this.sqr().sub(1).sqrt()))},t.prototype.atanh=function(){return this.abs().gte(1)?Number.NaN:t.ln(this.add(1).div(new t(1).sub(this)))/2},t.prototype.ascensionPenalty=function(t){return 0===t?this:this.pow(Math.pow(10,-t))},t.prototype.egg=function(){return this.add(9)},t.prototype.lessThanOrEqualTo=function(t){return this.cmp(t)<1},t.prototype.lessThan=function(t){return this.cmp(t)<0},t.prototype.greaterThanOrEqualTo=function(t){return this.cmp(t)>-1},t.prototype.greaterThan=function(t){return this.cmp(t)>0},t.prototype.decimalPlaces=function(){return this.dp()},t.prototype.dp=function(){if(!isFinite(this.mantissa))return NaN;if(this.exponent>=17)return 0;for(var t=this.mantissa,e=-this.exponent,r=1;Math.abs(Math.round(t*r)/r-t)>1e-10;)r*=10,e++;return e>0?e:0},Object.defineProperty(t,"MAX_VALUE",{get:function(){return m},enumerable:!1,configurable:!0}),Object.defineProperty(t,"MIN_VALUE",{get:function(){return f},enumerable:!1,configurable:!0}),Object.defineProperty(t,"NUMBER_MAX_VALUE",{get:function(){return d},enumerable:!1,configurable:!0}),Object.defineProperty(t,"NUMBER_MIN_VALUE",{get:function(){return g},enumerable:!1,configurable:!0}),t}(),m=c(1,i),f=c(1,-i),d=u(Number.MAX_VALUE),g=u(Number.MIN_VALUE);const y=h;var b,v;!function(t){t[t.Buildings=0]="Buildings",t[t.Upgrades=1]="Upgrades",t[t.Research=2]="Research",t[t.Setting=3]="Setting",t[t.Map=4]="Map"}(b||(b={})),function(t){t.Null="",t.WindTurbine="turbine",t.SolarPanel="solar-panel"}(v||(v={}));const w={mapWidth:34,mapHeight:17,buildingTickFunctions:{"":()=>{},turbine:()=>{G.power=G.power.add(1)},"solar-panel":()=>{}},buildingDescriptionFunctions:{"":()=>"",turbine:t=>`Produce <span style='color: var(--cyan-color)'>1</span> power. <br>Durability: ${t.durability}/30`,"solar-panel":()=>"Foo bar test test"},maxPower:new y(500),holdBuilding:v.Null,currentTab:b.Buildings},N=(Object.assign({},w),t=>t instanceof y||"object"==typeof t&&null!==t&&2===Object.keys(t).length&&"mantissa"in t&&"exponent"in t),M="function"==typeof Intl.NumberFormat.prototype.formatToParts?Intl.NumberFormat().formatToParts(1000.1).filter((t=>"decimal"===t.type||"group"===t.type)):null,[{value:E},{value:T}]=2!==(null==M?void 0:M.length)?[{value:","},{value:"."}]:M,x={minimumFractionDigits:2,maximumFractionDigits:2},_=(t,e=3)=>{let r=1,n="";for(let o=t.length-1;o>=0;o--)r++===e&&0!==o?(r=1,n=E+t[o]+n):n=t[o]+n;return n},q=(t,e=0,r=!1,n=!1)=>{if(null==t)return"0 [null]";if("object"==typeof t&&Symbol.toPrimitive in t&&(t=Number(t)),!(t instanceof y)&&"number"!=typeof t||isNaN(t))return isNaN(t)?"0 [NaN]":"0 [und.]";if("number"==typeof t&&t<(n?1e-15:.001)&&t>0)return t.toExponential(e);let o,i;if(N(t))o=t.e,i=t.mantissa;else{if(0===t)return"0";o=Math.floor(Math.log10(Math.abs(t))),i=t/Math.pow(10,o)}if(i>9.9999999&&(i=1,++o),i<1&&i>.9999999&&(i=1),o<-15)return"0";if(o<0&&!N(t)&&n)return o<=-15?`${q(i,e,r)} / ${Math.pow(10,-o-15)}Qa`:o<=-12?`${q(i,e,r)} / ${Math.pow(10,-o-12)}T`:o<=-9?`${q(i,e,r)} / ${Math.pow(10,-o-9)}B`:o<=-6?`${q(i,e,r)} / ${Math.pow(10,-o-6)}M`:o<=-3?`${q(i,e,r)} / ${Math.pow(10,-o-3)}K`:`${q(i,e,r)} / ${Math.pow(10,-o)}`;if(o<6||r&&o<13){let t,n=i*Math.pow(10,o);n-Math.floor(n)>.9999999&&(n=Math.ceil(n)),(o<2||r&&o<3)&&e>0?t=n.toFixed(2===o&&e>2?2:e):(n=Math.floor(n),t=n.toString());const[s,u]=t.split("."),a=_(s);return u?`${a}${T}${u}`:a}if(o<1e6){return`${(Math.floor(100*i)/100).toLocaleString(void 0,x)}e${_(o.toString())}`}if(o>=1e6){if(!Number.isFinite(o))return"Infinity";const t=(Math.floor(100*i)/100).toLocaleString(void 0,x),e=Math.ceil(Math.log10(o));let r=(e-1)%3+1,n=o/Math.pow(10,e-r);1e3===n&&(n=1,r=1);const s=n.toLocaleString(void 0,{minimumFractionDigits:4-r,maximumFractionDigits:4-r}),u=["","","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","UDc","DDc","TDc","QaDc","QiDc","SxDc","SpDc","OcDc","NoDc","Vg","UVg","DVg","TVg","QaVg","QiVg","SxVg","SpVg","OcVg","NoVg"],a=Math.floor(Math.log10(o)/3);return"string"==typeof u[a]?`${t}e${s}${u[a]}`:`e${o.toExponential(2)}`}return"0 [und.]"},I=()=>{w.currentTab,b.Buildings},S=(t,r)=>{G.buildings[t][r]=k(t,r,w.holdBuilding),e(`map-cell-${t}-${r}`).className="map-table-cell "+G.buildings[t][r].buildingType},k=(t,e,r)=>({row:t,col:e,buildingType:r,heat:new y(0),water:new y(0),durability:new y(0),tick:w.buildingTickFunctions[r],description:w.buildingDescriptionFunctions[r]}),F={0:I,1:I,2:I,3:I,4:I},L=()=>{const t=["money","power","research","flame"],r=["money-display","power-display","research-display","flame-display"];for(let n=0;n<t.length;n++){const o=q(G[`${t[n]}`]),i=e(`${r[n]}`);i.textContent!==o&&(i.textContent="power"==t[n]?`${o} / ${q(w.maxPower)}`:o)}e("power-bar").style.width=`${G.power.div(5)}%`,F[w.currentTab]()},P=(t,e)=>{const r=G.buildings[t][e];r.buildingType!=v.Null&&$(r.description(r))},$=t=>{e("description-content").innerHTML=t},D=t=>{w.currentTab=t,(()=>{e("buildings").style.display="none",e("buildings-tab").style.color="var(--foreground-color)",e("buildings-tab").style.backgroundColor="",e("upgrades").style.display="none",e("upgrade-tab").style.color="var(--foreground-color)",e("upgrade-tab").style.backgroundColor="",e("researches").style.display="none",e("research-tab").style.color="var(--foreground-color)",e("research-tab").style.backgroundColor="",e("map").style.display="none",e("map-tab").style.color="var(--foreground-color)",e("map-tab").style.backgroundColor="",e("settings").style.display="none",e("setting-tab").style.color="var(--foreground-color)",e("setting-tab").style.backgroundColor="";const t=e("tab-border");w.currentTab==b.Buildings&&(t.style.backgroundColor="var(--cyan-color)",e("buildings-tab").style.color="var(--background-color)",e("buildings-tab").style.backgroundColor="var(--cyan-color)",e("buildings").style.display="flex"),w.currentTab==b.Upgrades&&(t.style.backgroundColor="var(--yellow-color)",e("upgrade-tab").style.color="var(--background-color)",e("upgrade-tab").style.backgroundColor="var(--yellow-color)",e("upgrades").style.display="block"),w.currentTab==b.Research&&(t.style.backgroundColor="var(--purple-color)",e("research-tab").style.color="var(--background-color)",e("research-tab").style.backgroundColor="var(--purple-color)",e("researches").style.display="block"),w.currentTab==b.Map&&(t.style.backgroundColor="var(--green-color)",e("map-tab").style.color="var(--background-color)",e("map-tab").style.backgroundColor="var(--green-color)",e("map").style.display="block"),w.currentTab==b.Setting&&(t.style.backgroundColor="var(--orange-color)",e("setting-tab").style.color="var(--background-color)",e("setting-tab").style.backgroundColor="var(--orange-color)",e("settings").style.display="block")})();const r=document.activeElement;null!==r&&r.blur()},O=t=>{t==w.holdBuilding?(w.holdBuilding=v.Null,e(t).style.borderColor="var(--blue-color)"):(w.holdBuilding!=v.Null&&(e(w.holdBuilding).style.borderColor="var(--blue-color)"),w.holdBuilding=t,e(t).style.borderColor="var(--green-color)");const r=document.activeElement;null!==r&&r.blur()};var U=r(236);let V=null;const B=((t,e)=>()=>{if(null!==V)return V;const r=new Blob([e],{type:"application/javascript; charset=utf-8"}),n=URL.createObjectURL(r);return V=t(n),V.setTimeout((()=>URL.revokeObjectURL(n)),0),V})((t=>{const e=new Map([[0,()=>{}]]),r=new Map([[0,()=>{}]]),n=new Map,o=new Worker(t);o.addEventListener("message",(({data:t})=>{if(void 0!==(o=t).method&&"call"===o.method){const{params:{timerId:o,timerType:i}}=t;if("interval"===i){const t=e.get(o);if("number"==typeof t){const e=n.get(t);if(void 0===e||e.timerId!==o||e.timerType!==i)throw new Error("The timer is in an undefined state.")}else{if(void 0===t)throw new Error("The timer is in an undefined state.");t()}}else if("timeout"===i){const t=r.get(o);if("number"==typeof t){const e=n.get(t);if(void 0===e||e.timerId!==o||e.timerType!==i)throw new Error("The timer is in an undefined state.")}else{if(void 0===t)throw new Error("The timer is in an undefined state.");t(),r.delete(o)}}}else{if(!(t=>null===t.error&&"number"==typeof t.id)(t)){const{error:{message:e}}=t;throw new Error(e)}{const{id:o}=t,i=n.get(o);if(void 0===i)throw new Error("The timer is in an undefined state.");const{timerId:s,timerType:u}=i;n.delete(o),"interval"===u?e.delete(s):r.delete(s)}}var o}));return{clearInterval:t=>{const r=(0,U.generateUniqueNumber)(n);n.set(r,{timerId:t,timerType:"interval"}),e.set(t,r),o.postMessage({id:r,method:"clear",params:{timerId:t,timerType:"interval"}})},clearTimeout:t=>{const e=(0,U.generateUniqueNumber)(n);n.set(e,{timerId:t,timerType:"timeout"}),r.set(t,e),o.postMessage({id:e,method:"clear",params:{timerId:t,timerType:"timeout"}})},setInterval:(t,r)=>{const n=(0,U.generateUniqueNumber)(e);return e.set(n,(()=>{t(),"function"==typeof e.get(n)&&o.postMessage({id:null,method:"set",params:{delay:r,now:performance.now(),timerId:n,timerType:"interval"}})})),o.postMessage({id:null,method:"set",params:{delay:r,now:performance.now(),timerId:n,timerType:"interval"}}),n},setTimeout:(t,e)=>{const n=(0,U.generateUniqueNumber)(r);return r.set(n,t),o.postMessage({id:null,method:"set",params:{delay:e,now:performance.now(),timerId:n,timerType:"timeout"}}),n}}}),'(()=>{"use strict";const e=new Map,t=new Map,r=(e,t)=>{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);return{expected:r+o,remainingDelay:o}},o=(e,t,r,i)=>{const s=performance.now();s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;if("interval"===i)(t=>{const r=e.get(t);if(void 0===r)throw new Error(\'There is no interval scheduled with the given id "\'.concat(t,\'".\'));clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});else{if("timeout"!==i)throw new Error(\'The given type "\'.concat(i,\'" is not supported\'));(e=>{const r=t.get(e);if(void 0===r)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}else{if("set"!==s.method)throw new Error(\'The given method "\'.concat(s.method,\'" is not supported\'));{const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;if("interval"===d)((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);else{if("timeout"!==d)throw new Error(\'The given type "\'.concat(d,\'" is not supported\'));((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();'),C=t=>B().clearInterval(t),A=t=>B().clearTimeout(t),j=[],R=(t,e)=>{const r=((t,e)=>B().setInterval(t,e))(t,e);return j.push({id:r,type:"interval"}),r},z=t=>{for(const e of j)if("interval"===e.type&&e.id===t)return C(t),void j.splice(j.indexOf(e),1)},W=t=>{for(const e of j)if("timeout"===e.type&&e.id===t)return A(t),void j.splice(j.indexOf(e),1)};var Q=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{a(n.next(t))}catch(t){i(t)}}function u(t){try{a(n.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,u)}a((n=n.apply(t,e||[])).next())}))};const G={firstPlayed:(new Date).toISOString(),money:new y(0),research:new y(0),power:new y(0),flame:new y(0),buildings:[]};for(let t=0;t<17;t++){G.buildings.push([]);for(let e=0;e<34;e++)G.buildings[t].push(k(t,e,v.Null))}window.addEventListener("load",(()=>{(()=>{const t=document.getElementById("map-table");if(!t)throw new TypeError('Element with id "map-table" was not found on page?');t.style.width=32*w.mapWidth+"px",t.style.height=32*w.mapHeight+"px";for(let e=0;e<w.mapHeight;e++){const r=t.insertRow();r.id=`map-row${e}`;for(let t=0;t<w.mapWidth;t++){const n=r.insertCell();n.id=`map-cell-${e}-${t}`,n.className="map-table-cell "+G.buildings[e][t].buildingType,n.style.backgroundColor=(e+t)%2==0?"var(--frontground-color)":"var(--blue-color)",n.addEventListener("click",(()=>{S(e,t)})),n.addEventListener("mouseover",(()=>{P(e,t)}))}}})(),e("sell-power-button").addEventListener("click",(()=>{G.money=G.money.add(G.power),G.power=G.power.mul(0)})),e("buildings-tab").addEventListener("click",(()=>{D(b.Buildings)})),e("upgrade-tab").addEventListener("click",(()=>{D(b.Upgrades)})),e("research-tab").addEventListener("click",(()=>{D(b.Research)})),e("map-tab").addEventListener("click",(()=>{D(b.Map)})),e("setting-tab").addEventListener("click",(()=>{D(b.Setting)})),e("turbine").addEventListener("click",(()=>{O(v.WindTurbine)})),e("solar-panel").addEventListener("click",(()=>{O(v.SolarPanel)})),Y()}));const X=()=>{G.buildings.forEach((t=>{t.forEach((t=>{t.tick()}))})),G.power.greaterThan(w.maxPower)&&(G.power=w.maxPower),L()},H=()=>{},Y=(t=!1)=>Q(void 0,void 0,void 0,(function*(){(()=>{for(const{id:t,type:e}of j)"interval"===e?z(t):W(t)})(),yield new Promise((t=>{setTimeout(t,0)})),L(),D(b.Buildings),R(H,200),R(X,50)}))})()})();