(()=>{var t={236:function(t,e){!function(t){"use strict";var e=function(t){return function(e){var r=t(e);return e.add(r),r}},r=function(t){return function(e,r){return t.set(e,r),r}},n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,o=536870912,i=2*o,s=function(t,e){return function(r){var s=e.get(r),a=void 0===s?r.size:s<i?s+1:0;if(!r.has(a))return t(r,a);if(r.size<o){for(;r.has(a);)a=Math.floor(Math.random()*i);return t(r,a)}if(r.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;r.has(a);)a=Math.floor(Math.random()*n);return t(r,a)}},a=new WeakMap,u=r(a),l=s(u,a),c=e(l);t.addUniqueNumber=c,t.generateUniqueNumber=l,Object.defineProperty(t,"__esModule",{value:!0})}(e)},446:t=>{"use strict";t.exports=function(t,e,r){if(null==t||null==e)return t;var n=String(t),o="number"==typeof e?e:parseInt(e,10);if(isNaN(o)||!isFinite(o))return n;var i=n.length;if(i>=o)return n;var s=null==r?"":String(r);""===s&&(s=" ");for(var a=o-i;s.length<a;)s+=s;return n+(s.length>a?s.substr(0,a):s)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";r.d({},{hM:()=>X});const t=new Map,e=e=>{const r=t.get(e);if(r)return r;const n=document.getElementById(e);if(!n)throw new TypeError(`Element with id "${e}" was not found on page?`);return t.set(e,n),n};var n=r(446),o=r.n(n),i=9e15,s=function(){for(var t=[],e=-323;e<=308;e++)t.push(Number("1e"+e));return function(e){return t[e+323]}}(),a=function(t){return t instanceof h?t:new h(t)},u=function(t,e){return(new h).fromMantissaExponent(t,e)},l=function(t,e){return(new h).fromMantissaExponent_noNormalize(t,e)};function c(t,e,r,n){var o=e.mul(r.pow(n));return h.floor(t.div(o).mul(r.sub(1)).add(1).log10()/r.log10())}function p(t,e,r,n){return e.mul(r.pow(n)).mul(h.sub(1,r.pow(t))).div(h.sub(1,r))}var h=function(){function t(e){this.mantissa=NaN,this.exponent=NaN,void 0===e?(this.m=0,this.e=0):e instanceof t?this.fromDecimal(e):"number"==typeof e?this.fromNumber(e):this.fromString(e)}return Object.defineProperty(t.prototype,"m",{get:function(){return this.mantissa},set:function(t){this.mantissa=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"e",{get:function(){return this.exponent},set:function(t){this.exponent=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"s",{get:function(){return this.sign()},set:function(t){if(0===t)return this.e=0,void(this.m=0);this.sgn()!==t&&(this.m=-this.m)},enumerable:!1,configurable:!0}),t.fromMantissaExponent=function(e,r){return(new t).fromMantissaExponent(e,r)},t.fromMantissaExponent_noNormalize=function(e,r){return(new t).fromMantissaExponent_noNormalize(e,r)},t.fromDecimal=function(e){return(new t).fromDecimal(e)},t.fromNumber=function(e){return(new t).fromNumber(e)},t.fromString=function(e){return(new t).fromString(e)},t.fromValue=function(e){return(new t).fromValue(e)},t.fromValue_noAlloc=function(e){return e instanceof t?e:new t(e)},t.abs=function(t){return a(t).abs()},t.neg=function(t){return a(t).neg()},t.negate=function(t){return a(t).neg()},t.negated=function(t){return a(t).neg()},t.sign=function(t){return a(t).sign()},t.sgn=function(t){return a(t).sign()},t.round=function(t){return a(t).round()},t.floor=function(t){return a(t).floor()},t.ceil=function(t){return a(t).ceil()},t.trunc=function(t){return a(t).trunc()},t.add=function(t,e){return a(t).add(e)},t.plus=function(t,e){return a(t).add(e)},t.sub=function(t,e){return a(t).sub(e)},t.subtract=function(t,e){return a(t).sub(e)},t.minus=function(t,e){return a(t).sub(e)},t.mul=function(t,e){return a(t).mul(e)},t.multiply=function(t,e){return a(t).mul(e)},t.times=function(t,e){return a(t).mul(e)},t.div=function(t,e){return a(t).div(e)},t.divide=function(t,e){return a(t).div(e)},t.recip=function(t){return a(t).recip()},t.reciprocal=function(t){return a(t).recip()},t.reciprocate=function(t){return a(t).reciprocate()},t.cmp=function(t,e){return a(t).cmp(e)},t.compare=function(t,e){return a(t).cmp(e)},t.eq=function(t,e){return a(t).eq(e)},t.equals=function(t,e){return a(t).eq(e)},t.neq=function(t,e){return a(t).neq(e)},t.notEquals=function(t,e){return a(t).notEquals(e)},t.lt=function(t,e){return a(t).lt(e)},t.lte=function(t,e){return a(t).lte(e)},t.gt=function(t,e){return a(t).gt(e)},t.gte=function(t,e){return a(t).gte(e)},t.max=function(t,e){return a(t).max(e)},t.min=function(t,e){return a(t).min(e)},t.clamp=function(t,e,r){return a(t).clamp(e,r)},t.clampMin=function(t,e){return a(t).clampMin(e)},t.clampMax=function(t,e){return a(t).clampMax(e)},t.cmp_tolerance=function(t,e,r){return a(t).cmp_tolerance(e,r)},t.compare_tolerance=function(t,e,r){return a(t).cmp_tolerance(e,r)},t.eq_tolerance=function(t,e,r){return a(t).eq_tolerance(e,r)},t.equals_tolerance=function(t,e,r){return a(t).eq_tolerance(e,r)},t.neq_tolerance=function(t,e,r){return a(t).neq_tolerance(e,r)},t.notEquals_tolerance=function(t,e,r){return a(t).notEquals_tolerance(e,r)},t.lt_tolerance=function(t,e,r){return a(t).lt_tolerance(e,r)},t.lte_tolerance=function(t,e,r){return a(t).lte_tolerance(e,r)},t.gt_tolerance=function(t,e,r){return a(t).gt_tolerance(e,r)},t.gte_tolerance=function(t,e,r){return a(t).gte_tolerance(e,r)},t.log10=function(t){return a(t).log10()},t.absLog10=function(t){return a(t).absLog10()},t.pLog10=function(t){return a(t).pLog10()},t.log=function(t,e){return a(t).log(e)},t.log2=function(t){return a(t).log2()},t.ln=function(t){return a(t).ln()},t.logarithm=function(t,e){return a(t).logarithm(e)},t.pow10=function(t){return Number.isInteger(t)?l(1,t):u(Math.pow(10,t%1),Math.trunc(t))},t.pow=function(t,e){return"number"==typeof t&&10===t&&"number"==typeof e&&Number.isInteger(e)?l(1,e):a(t).pow(e)},t.exp=function(t){return a(t).exp()},t.sqr=function(t){return a(t).sqr()},t.sqrt=function(t){return a(t).sqrt()},t.cube=function(t){return a(t).cube()},t.cbrt=function(t){return a(t).cbrt()},t.dp=function(t){return a(t).dp()},t.decimalPlaces=function(t){return a(t).dp()},t.affordGeometricSeries=function(t,e,r,n){return c(a(t),a(e),a(r),n)},t.sumGeometricSeries=function(t,e,r,n){return p(t,a(e),a(r),n)},t.affordArithmeticSeries=function(t,e,r,n){return function(t,e,r,n){var o=e.add(n.mul(r)).sub(r.div(2)),i=o.pow(2);return o.neg().add(i.add(r.mul(t).mul(2)).sqrt()).div(r).floor()}(a(t),a(e),a(r),a(n))},t.sumArithmeticSeries=function(t,e,r,n){return function(t,e,r,n){var o=e.add(n.mul(r));return t.div(2).mul(o.mul(2).plus(t.sub(1).mul(r)))}(a(t),a(e),a(r),a(n))},t.efficiencyOfPurchase=function(t,e,r){return function(t,e,r){return t.div(e).add(t.div(r))}(a(t),a(e),a(r))},t.randomDecimalForTesting=function(t){if(20*Math.random()<1)return l(0,0);var e=10*Math.random();10*Math.random()<1&&(e=Math.round(e)),e*=Math.sign(2*Math.random()-1);var r=Math.floor(Math.random()*t*2)-t;return u(e,r)},t.prototype.normalize=function(){if(this.m>=1&&this.m<10)return this;if(0===this.m)return this.m=0,this.e=0,this;var t=Math.floor(Math.log10(Math.abs(this.m)));return this.m=-324===t?10*this.m/1e-323:this.m/s(t),this.e+=t,this},t.prototype.fromMantissaExponent=function(t,e){return isFinite(t)&&isFinite(e)?(this.m=t,this.e=e,this.normalize(),this):(t=Number.NaN,e=Number.NaN,this)},t.prototype.fromMantissaExponent_noNormalize=function(t,e){return this.m=t,this.e=e,this},t.prototype.fromDecimal=function(t){return this.m=t.m,this.e=t.e,this},t.prototype.fromNumber=function(t){return isNaN(t)?(this.m=Number.NaN,this.e=Number.NaN):t===Number.POSITIVE_INFINITY?(this.m=1,this.e=i):t===Number.NEGATIVE_INFINITY?(this.m=-1,this.e=i):0===t?(this.m=0,this.e=0):(this.e=Math.floor(Math.log10(Math.abs(t))),this.m=-324===this.e?10*t/1e-323:t/s(this.e),this.normalize()),this},t.prototype.fromString=function(t){if(-1!==t.indexOf("e")){var e=t.split("e");this.m=parseFloat(e[0]),this.e=parseFloat(e[1]),this.normalize()}else if("NaN"===t)this.m=Number.NaN,this.e=Number.NaN;else if(this.fromNumber(parseFloat(t)),isNaN(this.m))throw Error("[DecimalError] Invalid argument: "+t);return this},t.prototype.fromValue=function(e){return e instanceof t?this.fromDecimal(e):"number"==typeof e?this.fromNumber(e):"string"==typeof e?this.fromString(e):(this.m=0,this.e=0,this)},t.prototype.toNumber=function(){if(!isFinite(this.e))return Number.NaN;if(this.e>308)return this.m>0?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(this.e<-324)return 0;if(-324===this.e)return this.m>0?5e-324:-5e-324;var t=this.m*s(this.e);if(!isFinite(t)||this.e<0)return t;var e=Math.round(t);return Math.abs(e-t)<1e-10?e:t},t.prototype.mantissaWithDecimalPlaces=function(t){if(isNaN(this.m)||isNaN(this.e))return Number.NaN;if(0===this.m)return 0;var e=t+1,r=Math.ceil(Math.log10(Math.abs(this.m))),n=Math.round(this.m*Math.pow(10,e-r))*Math.pow(10,r-e);return parseFloat(n.toFixed(Math.max(e-r,0)))},t.prototype.toString=function(){return isNaN(this.m)||isNaN(this.e)?"NaN":this.e>=i?this.m>0?"Infinity":"-Infinity":this.e<=-i||0===this.m?"0":this.e<21&&this.e>-7?this.toNumber().toString():this.m+"e"+(this.e>=0?"+":"")+this.e},t.prototype.toExponential=function(t){if(isNaN(this.m)||isNaN(this.e))return"NaN";if(this.e>=i)return this.m>0?"Infinity":"-Infinity";if(this.e<=-i||0===this.m)return"0"+(t>0?o()(".",t+1,"0"):"")+"e+0";if(this.e>-324&&this.e<308)return this.toNumber().toExponential(t);isFinite(t)||(t=17);var e=t+1,r=Math.max(1,Math.ceil(Math.log10(Math.abs(this.m))));return(Math.round(this.m*Math.pow(10,e-r))*Math.pow(10,r-e)).toFixed(Math.max(e-r,0))+"e"+(this.e>=0?"+":"")+this.e},t.prototype.toFixed=function(t){return isNaN(this.m)||isNaN(this.e)?"NaN":this.e>=i?this.m>0?"Infinity":"-Infinity":this.e<=-i||0===this.m?"0"+(t>0?o()(".",t+1,"0"):""):this.e>=17?this.m.toString().replace(".","").padEnd(this.e+1,"0")+(t>0?o()(".",t+1,"0"):""):this.toNumber().toFixed(t)},t.prototype.toPrecision=function(t){return this.e<=-7?this.toExponential(t-1):t>this.e?this.toFixed(t-this.e-1):this.toExponential(t-1)},t.prototype.valueOf=function(){return this.toString()},t.prototype.toJSON=function(){return this.toString()},t.prototype.toStringWithDecimalPlaces=function(t){return this.toExponential(t)},t.prototype.abs=function(){return l(Math.abs(this.m),this.e)},t.prototype.neg=function(){return l(-this.m,this.e)},t.prototype.negate=function(){return this.neg()},t.prototype.negated=function(){return this.neg()},t.prototype.sign=function(){return Math.sign(this.m)},t.prototype.sgn=function(){return this.sign()},t.prototype.round=function(){return this.e<-1?new t(0):this.e<17?new t(Math.round(this.toNumber())):this},t.prototype.floor=function(){return this.e<-1?Math.sign(this.m)>=0?new t(0):new t(-1):this.e<17?new t(Math.floor(this.toNumber())):this},t.prototype.ceil=function(){return this.e<-1?Math.sign(this.m)>0?new t(1):new t(0):this.e<17?new t(Math.ceil(this.toNumber())):this},t.prototype.trunc=function(){return this.e<0?new t(0):this.e<17?new t(Math.trunc(this.toNumber())):this},t.prototype.add=function(t){var e,r,n=a(t);if(0===this.m)return n;if(0===n.m)return this;if(this.e>=n.e?(e=this,r=n):(e=n,r=this),e.e-r.e>17)return e;var o=Math.round(1e14*e.m+1e14*r.m*s(r.e-e.e));return u(o,e.e-14)},t.prototype.plus=function(t){return this.add(t)},t.prototype.sub=function(t){return this.add(a(t).neg())},t.prototype.subtract=function(t){return this.sub(t)},t.prototype.minus=function(t){return this.sub(t)},t.prototype.mul=function(e){if("number"==typeof e)return e<1e307&&e>-1e307?u(this.m*e,this.e):u(1e-307*this.m*e,this.e+307);var r="string"==typeof e?new t(e):e;return u(this.m*r.m,this.e+r.e)},t.prototype.multiply=function(t){return this.mul(t)},t.prototype.times=function(t){return this.mul(t)},t.prototype.div=function(t){return this.mul(a(t).recip())},t.prototype.divide=function(t){return this.div(t)},t.prototype.divideBy=function(t){return this.div(t)},t.prototype.dividedBy=function(t){return this.div(t)},t.prototype.recip=function(){return u(1/this.m,-this.e)},t.prototype.reciprocal=function(){return this.recip()},t.prototype.reciprocate=function(){return this.recip()},t.prototype.cmp=function(t){var e=a(t);if(0===this.m){if(0===e.m)return 0;if(e.m<0)return 1;if(e.m>0)return-1}if(0===e.m){if(this.m<0)return-1;if(this.m>0)return 1}if(this.m>0)return e.m<0||this.e>e.e?1:this.e<e.e?-1:this.m>e.m?1:this.m<e.m?-1:0;if(this.m<0)return e.m>0||this.e>e.e?-1:this.e<e.e||this.m>e.m?1:this.m<e.m?-1:0;throw Error("Unreachable code")},t.prototype.compare=function(t){return this.cmp(t)},t.prototype.eq=function(t){var e=a(t);return this.e===e.e&&this.m===e.m},t.prototype.equals=function(t){return this.eq(t)},t.prototype.neq=function(t){return!this.eq(t)},t.prototype.notEquals=function(t){return this.neq(t)},t.prototype.lt=function(t){var e=a(t);return 0===this.m?e.m>0:0===e.m?this.m<=0:this.e===e.e?this.m<e.m:this.m>0?e.m>0&&this.e<e.e:e.m>0||this.e>e.e},t.prototype.lte=function(t){return!this.gt(t)},t.prototype.gt=function(t){var e=a(t);return 0===this.m?e.m<0:0===e.m?this.m>0:this.e===e.e?this.m>e.m:this.m>0?e.m<0||this.e>e.e:e.m<0&&this.e<e.e},t.prototype.gte=function(t){return!this.lt(t)},t.prototype.max=function(t){var e=a(t);return this.lt(e)?e:this},t.prototype.min=function(t){var e=a(t);return this.gt(e)?e:this},t.prototype.clamp=function(t,e){return this.max(t).min(e)},t.prototype.clampMin=function(t){return this.max(t)},t.prototype.clampMax=function(t){return this.min(t)},t.prototype.cmp_tolerance=function(t,e){var r=a(t);return this.eq_tolerance(r,e)?0:this.cmp(r)},t.prototype.compare_tolerance=function(t,e){return this.cmp_tolerance(t,e)},t.prototype.eq_tolerance=function(e,r){var n=a(e);return t.lte(this.sub(n).abs(),t.max(this.abs(),n.abs()).mul(r))},t.prototype.equals_tolerance=function(t,e){return this.eq_tolerance(t,e)},t.prototype.neq_tolerance=function(t,e){return!this.eq_tolerance(t,e)},t.prototype.notEquals_tolerance=function(t,e){return this.neq_tolerance(t,e)},t.prototype.lt_tolerance=function(t,e){var r=a(t);return!this.eq_tolerance(r,e)&&this.lt(r)},t.prototype.lte_tolerance=function(t,e){var r=a(t);return this.eq_tolerance(r,e)||this.lt(r)},t.prototype.gt_tolerance=function(t,e){var r=a(t);return!this.eq_tolerance(r,e)&&this.gt(r)},t.prototype.gte_tolerance=function(t,e){var r=a(t);return this.eq_tolerance(r,e)||this.gt(r)},t.prototype.log10=function(){return this.e+Math.log10(this.m)},t.prototype.absLog10=function(){return this.e+Math.log10(Math.abs(this.m))},t.prototype.pLog10=function(){return this.m<=0||this.e<0?0:this.log10()},t.prototype.log=function(t){return Math.LN10/Math.log(t)*this.log10()},t.prototype.log2=function(){return 3.321928094887362*this.log10()},t.prototype.ln=function(){return 2.302585092994045*this.log10()},t.prototype.logarithm=function(t){return this.log(t)},t.prototype.pow=function(e){var r,n=e instanceof t?e.toNumber():e,o=this.e*n;if(Number.isSafeInteger(o)&&(r=Math.pow(this.m,n),isFinite(r)&&0!==r))return u(r,o);var i=Math.trunc(o),s=o-i;if(r=Math.pow(10,n*Math.log10(this.m)+s),isFinite(r)&&0!==r)return u(r,i);var a=t.pow10(n*this.absLog10());return-1===this.sign()?1===Math.abs(n%2)?a.neg():0===Math.abs(n%2)?a:new t(Number.NaN):a},t.prototype.pow_base=function(t){return a(t).pow(this)},t.prototype.factorial=function(){var e=this.toNumber()+1;return t.pow(e/Math.E*Math.sqrt(e*Math.sinh(1/e)+1/(810*Math.pow(e,6))),e).mul(Math.sqrt(2*Math.PI/e))},t.prototype.exp=function(){var e=this.toNumber();return-706<e&&e<709?t.fromNumber(Math.exp(e)):t.pow(Math.E,e)},t.prototype.sqr=function(){return u(Math.pow(this.m,2),2*this.e)},t.prototype.sqrt=function(){return this.m<0?new t(Number.NaN):this.e%2!=0?u(3.16227766016838*Math.sqrt(this.m),Math.floor(this.e/2)):u(Math.sqrt(this.m),Math.floor(this.e/2))},t.prototype.cube=function(){return u(Math.pow(this.m,3),3*this.e)},t.prototype.cbrt=function(){var t=1,e=this.m;e<0&&(t=-1,e=-e);var r=t*Math.pow(e,1/3),n=this.e%3;return u(1===n||-1===n?2.154434690031883*r:0!==n?4.641588833612778*r:r,Math.floor(this.e/3))},t.prototype.sinh=function(){return this.exp().sub(this.negate().exp()).div(2)},t.prototype.cosh=function(){return this.exp().add(this.negate().exp()).div(2)},t.prototype.tanh=function(){return this.sinh().div(this.cosh())},t.prototype.asinh=function(){return t.ln(this.add(this.sqr().add(1).sqrt()))},t.prototype.acosh=function(){return t.ln(this.add(this.sqr().sub(1).sqrt()))},t.prototype.atanh=function(){return this.abs().gte(1)?Number.NaN:t.ln(this.add(1).div(new t(1).sub(this)))/2},t.prototype.ascensionPenalty=function(t){return 0===t?this:this.pow(Math.pow(10,-t))},t.prototype.egg=function(){return this.add(9)},t.prototype.lessThanOrEqualTo=function(t){return this.cmp(t)<1},t.prototype.lessThan=function(t){return this.cmp(t)<0},t.prototype.greaterThanOrEqualTo=function(t){return this.cmp(t)>-1},t.prototype.greaterThan=function(t){return this.cmp(t)>0},t.prototype.decimalPlaces=function(){return this.dp()},t.prototype.dp=function(){if(!isFinite(this.mantissa))return NaN;if(this.exponent>=17)return 0;for(var t=this.mantissa,e=-this.exponent,r=1;Math.abs(Math.round(t*r)/r-t)>1e-10;)r*=10,e++;return e>0?e:0},Object.defineProperty(t,"MAX_VALUE",{get:function(){return m},enumerable:!1,configurable:!0}),Object.defineProperty(t,"MIN_VALUE",{get:function(){return f},enumerable:!1,configurable:!0}),Object.defineProperty(t,"NUMBER_MAX_VALUE",{get:function(){return d},enumerable:!1,configurable:!0}),Object.defineProperty(t,"NUMBER_MIN_VALUE",{get:function(){return g},enumerable:!1,configurable:!0}),t}(),m=l(1,i),f=l(1,-i),d=a(Number.MAX_VALUE),g=a(Number.MIN_VALUE);const y=h;var b,v;!function(t){t[t.Buildings=0]="Buildings",t[t.Upgrades=1]="Upgrades",t[t.Research=2]="Research",t[t.Setting=3]="Setting",t[t.Map=4]="Map"}(b||(b={})),function(t){t[t.Null=0]="Null",t[t.WindTurbine=1]="WindTurbine",t[t.SolarPanel=2]="SolarPanel"}(v||(v={}));const w=()=>{},N={mapWidth:34,mapHeight:17,buildingClass:["","turbine","solar-panel"],buildingTickFunctions:[w,()=>{X.power=X.power.add(.15)},w],buildingDescriptionFunctions:[()=>"You can add components to this tile. You can start with wind turbines, they produce power that you can sell for more money.",t=>`Produce <span style='color:var(--cyan-color)'>0.15</span> power. <br>Durability: ${t.durability}/30`,t=>`Produce <span style='color:var(--red-color)'>3</span> heat. <br>Durability: ${t.durability}/30`],componentDescription:[],buildingName:["Empty Tile","Wind Turbine","Solar Panel"],buildingCost:[new y(0),new y(10),new y(100)],maxPower:new y(500),holdBuilding:v.Null,shift:!1,shiftRemove:!1,currentTab:b.Buildings};N.componentDescription=["",`Cost: <span style='color:var(--yellow-color)'>${N.buildingCost[v.WindTurbine]}</span> <br> Produce <span style='color:var(--cyan-color)'>0.15</span> power.`,`Cost: <span style='color:var(--yellow-color)'>${N.buildingCost[v.SolarPanel]}</span> <br> Produce <span style='color:var(--red-color)'>3</span> heat.`];Object.assign({},N);const M=t=>t instanceof y||"object"==typeof t&&null!==t&&2===Object.keys(t).length&&"mantissa"in t&&"exponent"in t,E="function"==typeof Intl.NumberFormat.prototype.formatToParts?Intl.NumberFormat().formatToParts(1000.1).filter((t=>"decimal"===t.type||"group"===t.type)):null,[{value:T},{value:x}]=2!==(null==E?void 0:E.length)?[{value:","},{value:"."}]:E,_={minimumFractionDigits:2,maximumFractionDigits:2},q=(t,e=3)=>{let r=1,n="";for(let o=t.length-1;o>=0;o--)r++===e&&0!==o?(r=1,n=T+t[o]+n):n=t[o]+n;return n},I=(t,e=0,r=!1,n=!1)=>{if(null==t)return"0 [null]";if("object"==typeof t&&Symbol.toPrimitive in t&&(t=Number(t)),!(t instanceof y)&&"number"!=typeof t||isNaN(t))return isNaN(t)?"0 [NaN]":"0 [und.]";if("number"==typeof t&&t<(n?1e-15:.001)&&t>0)return t.toExponential(e);let o,i;if(M(t))o=t.e,i=t.mantissa;else{if(0===t)return"0";o=Math.floor(Math.log10(Math.abs(t))),i=t/Math.pow(10,o)}if(i>9.9999999&&(i=1,++o),i<1&&i>.9999999&&(i=1),o<-15)return"0";if(o<0&&!M(t)&&n)return o<=-15?`${I(i,e,r)} / ${Math.pow(10,-o-15)}Qa`:o<=-12?`${I(i,e,r)} / ${Math.pow(10,-o-12)}T`:o<=-9?`${I(i,e,r)} / ${Math.pow(10,-o-9)}B`:o<=-6?`${I(i,e,r)} / ${Math.pow(10,-o-6)}M`:o<=-3?`${I(i,e,r)} / ${Math.pow(10,-o-3)}K`:`${I(i,e,r)} / ${Math.pow(10,-o)}`;if(o<6||r&&o<13){let t,n=i*Math.pow(10,o);n-Math.floor(n)>.9999999&&(n=Math.ceil(n)),(o<2||r&&o<3)&&e>0?t=n.toFixed(2===o&&e>2?2:e):(n=Math.floor(n),t=n.toString());const[s,a]=t.split("."),u=q(s);return a?`${u}${x}${a}`:u}if(o<1e6){return`${(Math.floor(100*i)/100).toLocaleString(void 0,_)}e${q(o.toString())}`}if(o>=1e6){if(!Number.isFinite(o))return"Infinity";const t=(Math.floor(100*i)/100).toLocaleString(void 0,_),e=Math.ceil(Math.log10(o));let r=(e-1)%3+1,n=o/Math.pow(10,e-r);1e3===n&&(n=1,r=1);const s=n.toLocaleString(void 0,{minimumFractionDigits:4-r,maximumFractionDigits:4-r}),a=["","","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","UDc","DDc","TDc","QaDc","QiDc","SxDc","SpDc","OcDc","NoDc","Vg","UVg","DVg","TVg","QaVg","QiVg","SxVg","SpVg","OcVg","NoVg"],u=Math.floor(Math.log10(o)/3);return"string"==typeof a[u]?`${t}e${s}${a[u]}`:`e${o.toExponential(2)}`}return"0 [und.]"},S=()=>{N.currentTab,b.Buildings},k=(t,e)=>{C(t,e,N.holdBuilding)},C=(t,r,n)=>{n!=v.Null&&X.buildings[t][r].buildingType!=v.Null||(n!=v.Null&&X.money.lessThan(N.buildingCost[n])?$("",`<span style='color: var(--red-color)'>You don't have enough money for ${N.buildingName[n]}!</span>`):(X.buildings[t][r]=L(t,r,n),X.money=X.money.minus(N.buildingCost[n]),P(t,r),e(`map-cell-${t}-${r}`).className="map-table-cell "+N.buildingClass[X.buildings[t][r].buildingType]))},L=(t,e,r)=>({row:t,col:e,buildingType:r,heat:new y(0),water:new y(0),durability:new y(30),tick:N.buildingTickFunctions[r],description:N.buildingDescriptionFunctions[r]}),F={0:S,1:S,2:S,3:S,4:S},D=()=>{const t=["money","power","research","flame"],r=["money-display","power-display","research-display","flame-display"];for(let n=0;n<t.length;n++){const o=I(X[`${t[n]}`]),i=e(`${r[n]}`);i.textContent!==o&&(i.textContent="power"==t[n]?`${o} / ${I(N.maxPower)}`:o)}e("power-bar").style.width=`${X.power.div(5)}%`,F[N.currentTab]()},P=(t,e)=>{const r=X.buildings[t][e];$(N.buildingDescriptionFunctions[r.buildingType](r),N.buildingName[r.buildingType])},$=(t,r)=>{e("tooltip").style.display="block",e("description-title").innerHTML=r,e("description-content").innerHTML=t},O=()=>{e("tooltip").style.display="none"},U=t=>{N.currentTab=t,(()=>{e("buildings").style.display="none",e("buildings-tab").style.color="var(--foreground-color)",e("buildings-tab").style.backgroundColor="",e("upgrades").style.display="none",e("upgrade-tab").style.color="var(--foreground-color)",e("upgrade-tab").style.backgroundColor="",e("researches").style.display="none",e("research-tab").style.color="var(--foreground-color)",e("research-tab").style.backgroundColor="",e("map").style.display="none",e("map-tab").style.color="var(--foreground-color)",e("map-tab").style.backgroundColor="",e("settings").style.display="none",e("setting-tab").style.color="var(--foreground-color)",e("setting-tab").style.backgroundColor="";const t=e("tab-border"),r=e("tooltip");N.currentTab==b.Buildings&&(t.style.backgroundColor="var(--cyan-color)",r.style.borderColor="var(--cyan-color)",e("buildings-tab").style.color="var(--background-color)",e("buildings-tab").style.backgroundColor="var(--cyan-color)",e("buildings").style.display="flex"),N.currentTab==b.Upgrades&&(t.style.backgroundColor="var(--yellow-color)",r.style.borderColor="var(--yellow-color)",e("upgrade-tab").style.color="var(--background-color)",e("upgrade-tab").style.backgroundColor="var(--yellow-color)",e("upgrades").style.display="block"),N.currentTab==b.Research&&(t.style.backgroundColor="var(--purple-color)",r.style.borderColor="var(--purple-color)",e("research-tab").style.color="var(--background-color)",e("research-tab").style.backgroundColor="var(--purple-color)",e("researches").style.display="block"),N.currentTab==b.Map&&(t.style.backgroundColor="var(--green-color)",r.style.borderColor="var(--green-color)",e("map-tab").style.color="var(--background-color)",e("map-tab").style.backgroundColor="var(--green-color)",e("map").style.display="block"),N.currentTab==b.Setting&&(t.style.backgroundColor="var(--orange-color)",r.style.borderColor="var(--orange-color)",e("setting-tab").style.color="var(--background-color)",e("setting-tab").style.backgroundColor="var(--orange-color)",e("settings").style.display="block")})();const r=document.activeElement;null!==r&&r.blur()},V=()=>{document.addEventListener("mousemove",(t=>{const r=e("tooltip");r.style.left=t.pageX+"px",r.style.top=t.pageY+"px"})),e("body").addEventListener("keyup",(t=>{N.shift&&"Shift"==t.key&&(N.shift=!1),N.shiftRemove&&"Shift"==t.key&&(N.shift=!1)})),e("sell-power-button").addEventListener("click",(()=>{X.money=X.money.add(X.power),X.power=X.power.mul(0)})),e("buildings-tab").addEventListener("click",(()=>{U(b.Buildings)})),e("upgrade-tab").addEventListener("click",(()=>{U(b.Upgrades)})),e("research-tab").addEventListener("click",(()=>{U(b.Research)})),e("map-tab").addEventListener("click",(()=>{U(b.Map)})),e("setting-tab").addEventListener("click",(()=>{U(b.Setting)})),N.buildingClass.forEach(((t,r)=>{""!=t&&(e(t).addEventListener("click",(()=>{(t=>{t==N.holdBuilding?(N.holdBuilding=v.Null,e(N.buildingClass[t]).style.borderColor="var(--blue-color)"):(N.holdBuilding!=v.Null&&(e(N.buildingClass[N.holdBuilding]).style.borderColor="var(--blue-color)"),N.holdBuilding=t,e(N.buildingClass[t]).style.borderColor="var(--green-color)");const r=document.activeElement;null!==r&&r.blur()})(r)})),e(t).addEventListener("mouseover",(()=>{(t=>{$(N.componentDescription[t],N.buildingName[t])})(r)})),e(t).addEventListener("mouseout",(()=>{O()})))}))};var B=r(236);let A=null;const j=((t,e)=>()=>{if(null!==A)return A;const r=new Blob([e],{type:"application/javascript; charset=utf-8"}),n=URL.createObjectURL(r);return A=t(n),A.setTimeout((()=>URL.revokeObjectURL(n)),0),A})((t=>{const e=new Map([[0,()=>{}]]),r=new Map([[0,()=>{}]]),n=new Map,o=new Worker(t);o.addEventListener("message",(({data:t})=>{if(void 0!==(o=t).method&&"call"===o.method){const{params:{timerId:o,timerType:i}}=t;if("interval"===i){const t=e.get(o);if("number"==typeof t){const e=n.get(t);if(void 0===e||e.timerId!==o||e.timerType!==i)throw new Error("The timer is in an undefined state.")}else{if(void 0===t)throw new Error("The timer is in an undefined state.");t()}}else if("timeout"===i){const t=r.get(o);if("number"==typeof t){const e=n.get(t);if(void 0===e||e.timerId!==o||e.timerType!==i)throw new Error("The timer is in an undefined state.")}else{if(void 0===t)throw new Error("The timer is in an undefined state.");t(),r.delete(o)}}}else{if(!(t=>null===t.error&&"number"==typeof t.id)(t)){const{error:{message:e}}=t;throw new Error(e)}{const{id:o}=t,i=n.get(o);if(void 0===i)throw new Error("The timer is in an undefined state.");const{timerId:s,timerType:a}=i;n.delete(o),"interval"===a?e.delete(s):r.delete(s)}}var o}));return{clearInterval:t=>{const r=(0,B.generateUniqueNumber)(n);n.set(r,{timerId:t,timerType:"interval"}),e.set(t,r),o.postMessage({id:r,method:"clear",params:{timerId:t,timerType:"interval"}})},clearTimeout:t=>{const e=(0,B.generateUniqueNumber)(n);n.set(e,{timerId:t,timerType:"timeout"}),r.set(t,e),o.postMessage({id:e,method:"clear",params:{timerId:t,timerType:"timeout"}})},setInterval:(t,r)=>{const n=(0,B.generateUniqueNumber)(e);return e.set(n,(()=>{t(),"function"==typeof e.get(n)&&o.postMessage({id:null,method:"set",params:{delay:r,now:performance.now(),timerId:n,timerType:"interval"}})})),o.postMessage({id:null,method:"set",params:{delay:r,now:performance.now(),timerId:n,timerType:"interval"}}),n},setTimeout:(t,e)=>{const n=(0,B.generateUniqueNumber)(r);return r.set(n,t),o.postMessage({id:null,method:"set",params:{delay:e,now:performance.now(),timerId:n,timerType:"timeout"}}),n}}}),'(()=>{"use strict";const e=new Map,t=new Map,r=(e,t)=>{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);return{expected:r+o,remainingDelay:o}},o=(e,t,r,i)=>{const s=performance.now();s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;if("interval"===i)(t=>{const r=e.get(t);if(void 0===r)throw new Error(\'There is no interval scheduled with the given id "\'.concat(t,\'".\'));clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});else{if("timeout"!==i)throw new Error(\'The given type "\'.concat(i,\'" is not supported\'));(e=>{const r=t.get(e);if(void 0===r)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}else{if("set"!==s.method)throw new Error(\'The given method "\'.concat(s.method,\'" is not supported\'));{const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;if("interval"===d)((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);else{if("timeout"!==d)throw new Error(\'The given type "\'.concat(d,\'" is not supported\'));((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();'),R=t=>j().clearInterval(t),W=t=>j().clearTimeout(t),z=[],Y=(t,e)=>{const r=((t,e)=>j().setInterval(t,e))(t,e);return z.push({id:r,type:"interval"}),r},Q=t=>{for(const e of z)if("interval"===e.type&&e.id===t)return R(t),void z.splice(z.indexOf(e),1)},G=t=>{for(const e of z)if("timeout"===e.type&&e.id===t)return W(t),void z.splice(z.indexOf(e),1)};var H=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{u(n.next(t))}catch(t){i(t)}}function a(t){try{u(n.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}u((n=n.apply(t,e||[])).next())}))};const X={firstPlayed:(new Date).toISOString(),money:new y(10),research:new y(0),power:new y(0),flame:new y(0),buildings:[]};for(let t=0;t<N.mapHeight;t++){X.buildings.push([]);for(let e=0;e<N.mapWidth;e++)X.buildings[t].push(L(t,e,v.Null))}window.addEventListener("load",(()=>{(()=>{const t=document.getElementById("map-table");if(!t)throw new TypeError('Element with id "map-table" was not found on page?');t.style.width=32*N.mapWidth+"px",t.style.height=32*N.mapHeight+"px";for(let e=0;e<N.mapHeight;e++){const r=t.insertRow();r.id=`map-row${e}`;for(let t=0;t<N.mapWidth;t++){const n=r.insertCell();n.id=`map-cell-${e}-${t}`,n.className="map-table-cell "+N.buildingClass[X.buildings[e][t].buildingType],n.style.backgroundColor=(e+t)%2==0?"var(--frontground-color)":"var(--blue-color)",n.addEventListener("click",(r=>{k(e,t),r.shiftKey&&(N.shift=!0)})),n.addEventListener("mouseover",(()=>{P(e,t),N.shift&&k(e,t),N.shiftRemove&&C(e,t,v.Null)})),n.addEventListener("contextmenu",(r=>(r.preventDefault(),C(e,t,v.Null),r.shiftKey&&(N.shiftRemove=!0),!1))),n.addEventListener("mouseout",(()=>{O()}))}}})(),V(),Z()}));const K=()=>{X.buildings.forEach((t=>{t.forEach((t=>{N.buildingTickFunctions[t.buildingType]()}))})),X.power.greaterThan(N.maxPower)&&(X.power=N.maxPower),D()},J=()=>{},Z=(t=!1)=>H(void 0,void 0,void 0,(function*(){(()=>{for(const{id:t,type:e}of z)"interval"===e?Q(t):G(t)})(),yield new Promise((t=>{setTimeout(t,0)})),D(),U(b.Buildings),Y(J,200),Y(K,50)}))})()})();