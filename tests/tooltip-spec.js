var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  Tooltip = require('../index');

var Tip = Tooltip.Tip;

describe('测试tip',function(){
 
  describe('测试生成',function(){
    var title = '测试',
      tip  = new Tip({
      title : title
    });

    tip.render();
    var el = tip.get('el');
    it('测试tip生成',function(){
      expect(el.length).not.to.be(0);
    });
    it('测试title',function(){
      expect(el.text()).to.be(title);
    });

    it('测试指向箭头',function(){
      expect(el.find('.x-align-arrow').length).not.to.be(0);
    });
  });

  describe('测试对齐样式',function(){
    var title = '测试',
      tip  = new Tip({
      title : title,
      elCls:"tips tips-warning",
      trigger : '#t1',
      delegateTigger : true
    });

    tip.render();
    var el = tip.get('el');
    it('测试顶部对齐',function(){
      tip.set('align',{
        points : ['bc','tc']
      });
      expect(el.hasClass('x-align-bc-tc')).to.be(true);
    });
    it('测试底部对齐',function(){
      tip.set('align',{
        points : ['tc','bc']
      });
      expect(el.hasClass('x-align-bc-tc')).to.be(false);
      expect(el.hasClass('x-align-tc-bc')).to.be(true);
    });
    it('测试居左',function(){
      tip.set('align',{
        points : ['cl','cr']
      });
      expect(el.hasClass('x-align-tc-bc')).to.be(false);
      expect(el.hasClass('x-align-cl-cr')).to.be(true);
    });

    it('测试居右',function(){
      tip.set('align',{
        points : ['cr','cl']
      });
      expect(el.hasClass('x-align-cl-cr')).to.be(false);
      expect(el.hasClass('x-align-cr-cl')).to.be(true);
    });

    it('测试居上',function(){
      tip.set('alignType','top');
      expect(el.hasClass('x-align-top')).to.be(true);
      expect(el.hasClass('x-align-tc-bc')).to.be(true);
    });
    it('测试居下',function(){
      tip.set('alignType','bottom');
      expect(el.hasClass('x-align-bottom')).to.be(true);
      expect(el.hasClass('x-align-bc-tc')).to.be(true);
    });
    it('测试居左',function(){
      tip.set('alignType','left');
      expect(el.hasClass('x-align-left')).to.be(true);
      expect(el.hasClass('x-align-cl-cr')).to.be(true);
    });
    it('测试居右',function(){
      tip.set('alignType','right');
      expect(el.hasClass('x-align-right')).to.be(true);
      expect(el.hasClass('x-align-cr-cl')).to.be(true);
    });
    it('测试居左上',function(){
      tip.set('alignType','top-left');
      expect(el.hasClass('x-align-top-left')).to.be(true);
      expect(el.hasClass('x-align-tl-bl')).to.be(true);
    });
    it('测试右上',function(){
      tip.set('alignType','top-right');
      expect(el.hasClass('x-align-top-right')).to.be(true);
      expect(el.hasClass('x-align-tr-br')).to.be(true);
    });
    it('测试居左下',function(){
      tip.set('alignType','bottom-left');
      expect(el.hasClass('x-align-bottom-left')).to.be(true);
      expect(el.hasClass('x-align-bl-tl')).to.be(true);
    });
    it('测试右下',function(){
      tip.set('alignType','bottom-right');
      expect(el.hasClass('x-align-bottom-right')).to.be(true);
      expect(el.hasClass('x-align-br-tr')).to.be(true);
    });
  });

  describe('测试委托',function(){

  });

  describe('测试操作',function(){
    var title = '测试',
      tip  = new Tip({
      title : title
    });

    tip.render();
    var el = tip.get('el');
    it('更改title',function(){
      var title = 'new test';
      tip.set('title',title);
      expect(el.text()).to.be(title);
    });

    it('设置object title',function(){
      var title = {text : 'abc',value:123}
      tip.set('titleTpl','<span>{text}:{value}</span>');
      tip.set('title',title);
      expect(el.text()).to.be(title.text + ':' + title.value);
    });
  });
});



describe('测试tips',function(){
  var Tips = Tooltip.Tips;
  var tips = new Tips({
    tip : {
      trigger: 'code',
      alignType : 'top',
      offset: 8,
      elCls : 'tips tips-small tips-success',
      titleTpl : '<span class="x-icon x-icon-small x-icon-success"><i class="icon icon-white icon-question"></i></span>\
      <div class="tips-content">{title}</div>'
    }
  }).render();
  var tip = tips.get('tip'),
    codeList = $('code');
  describe('测试生成',function(){
    it('测试tips,生成',function () {
      expect(tip).not.to.be(undefined);
      expect(tip.get('el').length).to.be(1);
    });

  });

  describe('测试显示',function(){
    var el1 = codeList.first(),
        title = el1.attr('title');
    it('测试显示',function () {
      el1.trigger('mouseover');
      expect(tip.get('visible')).to.be(true);
    });
    it('测试显示的内容',function () {
      expect(tip.get('title')).to.be(title);
      expect(el1.attr('data-title')).to.be(title);
      expect($.trim(tip.get('el').text())).to.be(title);
    });
    it('测试显示的位置',function () {
       expect(tip.get('alignType')).to.be(el1.attr('data-align'));
    });
    it('隐藏',function () {
      el1.trigger('mouseout');
      expect(tip.get('visible')).to.be(false);
    });
  });

  describe('测试显示内容',function(){
    var el5 = $(codeList[5]),
      title = el5.attr('title');
    it('切换提示，显示',function () {
      el5.trigger('mouseover');
      expect(tip.get('title')).not.to.be(title);
      expect($.isPlainObject(tip.get('title'))).to.be(true);
      expect(tip.get('alignType')).to.be(el5.attr('data-align'));
      
    });
    it('显示复杂信息',function () {
      expect(tip.get('title').title).to.be($.trim(tip.get('el').text()));
    });
  });
});

// describe('测试srcNode',function () {
//   var tip = new Tip({
//     trigger: '#t3',
//     srcNode : '#tip',
//     offset: 8,
//     /*triggerEvent : 'click', //点击出现
//     autoHideType : 'click',*/
//     autoHideDelay : 1000,
//    /* */effect : {
//       effect : 'fade',
//       duration : 300
//     },
//     alignType : 'right'
//   });
//   tip.render();
//   //tip.hide();
//   it('控件生成',function () {
//     $('#t3').trigger('mouseover');
//     waits(500);
//     runs(function(){
//       expect(tip.get('visible')).to.be(true);
//     })
    
//     waits(1500);
//     runs(function(){
//       expect(tip.get('visible')).to.be(false);
//     });
//   });
// });
/**/
