

    (function( jQuery ){
  var $module = jQuery('#m-1676893937078').children('.module');
  $module.gfV3Product();
})( window.GemQuery || jQuery );
  
    
  
    
  (function( jQuery ){
  // var $module = jQuery('#m-1678123251909').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    
  (function( jQuery ){
  // var $module = jQuery('#m-1677151785064').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    
  
    (function( jQuery ){
  var $module = jQuery('#m-1679322351172').children('.module');
  $module.gfV3ProductCartButton({ onItemAdded: function(data) {}});
})( window.GemQuery || jQuery );
  
    
  
    (function(jQuery) {
    var $module = jQuery('#m-1678122975992').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);
  (function( jQuery ){
  // var $module = jQuery('#m-1679311160586').children('.module');
  // You can add custom Javascript code right here.

  const mobile = window.matchMedia('(max-width: 767px)').matches;
  const divs = document.querySelectorAll('.variant-gallery');
  const multi = 1 < divs.length;
  let target = document.querySelector('.product-grid__container > .grid__item, .gf_row > .gf_column'), target2;

  let startGallery = (div, cellSel, thumbSel) => {
    const carousel = div.querySelector('.product-slideshow');
    
    let flkty = Flickity.data(carousel);
    let newFlkty = !flkty;
    let thumbs_flkty;
    let thumbsCarousel;
    let preventClick = false;

    let clickThumb = (event) => {
      event.preventDefault();
      
      if(!flkty || preventClick) {
        return;
      }

      let a = event.target;

      if(a.tagName !== 'A') {
        a = a.closest('a');
      }

      let i = a.getAttribute('data-index');
      
      if(!i) {
        return;
      }

      flkty.selectCell(`.product-main-slide[data-index="${i}"]`);
    };
    
    flkty = new Flickity(carousel, {
      // options
      cellSelector: cellSel ? cellSel : '.product-main-slide',
      cellAlign: 'left',
      contain: true
    });

    if(newFlkty) {
      flkty.on('change', function( index ) {
        if(thumbs_flkty) {
          const sel = `.product__thumb-item[data-index="${carousel.querySelector('.is-selected').getAttribute('data-index')}"]`;
          let a = thumbsCarousel.querySelector('a.selected');

          if(a) {
            a.classList.remove('selected');
          }
          thumbsCarousel.querySelector(sel + ' a').classList.add('selected');
          thumbs_flkty.selectCell(sel);
        }
      });
    }

    // if(!mobile) {
    //   setTimeout(function() {
    //     thumbsCarousel = div.querySelector('.product__thumbs--scroller');
    //     thumbs_flkty = Flickity.data(thumbsCarousel);
    //     let new_thumbs_flkty = !thumbs_flkty;

    //     thumbs_flkty = new Flickity(thumbsCarousel, {
    //       // options
    //       cellSelector: thumbSel ? thumbSel : '.product__thumb-item',
    //       cellAlign: 'left',
    //       contain: true,
    //       pageDots: false,
    //       prevNextButtons: false,
    //       setGallerySize: false
    //     });

    //     if(new_thumbs_flkty) {
          div.querySelectorAll('.product__thumb-item > a').forEach(function(a) {
            a.removeEventListener('click', clickThumb);
            a.addEventListener('click', clickThumb);
          });
    
    //       if(!multi) {
    //         let a = document.querySelector(`.product__thumb-item:not(.hide) > a`);
  
    //         if(a) {
    //           a.click();
    //         }
    //       }

    //       thumbs_flkty.on('dragStart', function(event) {
    //         preventClick = true;
    //       });

    //       thumbs_flkty.on('dragEnd', function(event) {
    //         preventClick = false;
    //       });
    //     }
    //   }, 1000);
    // }
  };

  if(!Flickity) {
    return;
  }

  if(divs && target) {
    let div_new = document.createElement('div');
    
    if(target.classList.contains('gf_column')) {
      if(mobile) {
        target = document.querySelector('[data-key="p-image"]');
        
        target2 = document.querySelector('[data-key="p-image-list"]');
        target2.outerHTML = '';
        
      } else {
        div_new.classList.add('gf_column', 'gf_col-xs-12', 'gf_col-sm-12', 'gf_col-md-', 'gf_col-lg-7');
      }
      
    } else {
      div_new.classList.add('product-grid__content', 'grid__item', 'medium-up--one-half');
    }
    
    target.insertAdjacentElement('afterend', div_new);
    
    divs.forEach(function(div) {
      div_new.insertAdjacentElement('beforeend', div);
    });
    
    target.outerHTML = '';
  }

  divs.forEach(function(div) {
    startGallery(div);
  });

  selectGallery(divs[0].getAttribute('data-id'));

  document.addEventListener('variant:change', function(evt) {
    selectGallery(evt.detail.variant.id);
  });

  function selectGallery(id) {
    if(multi) {
      let gallery_sel = document.querySelector(`#variant-gallery-${id}`);
      
      divs.forEach(function(div) {
        if(div === gallery_sel) {
          div.classList.remove('gallery-hide');
        } else {
          div.classList.add('gallery-hide');
        }
      });
      
    } else {
      divs.forEach(function(div) {
          div.querySelectorAll('.type-variant').forEach(function(tv) {
            const match = tv.classList.contains(`variant-${id}`) || tv.classList.contains(`type-default`);
            let tv_target, i;
            
            if(tv.classList.contains(`product-main-slide`)) {
              tv_target = tv;
  
            } else {
              tv_target = tv.parentElement;
            
              if(match) {
                tv_target.classList.remove('hide');
              } else {
                tv_target.classList.add('hide');
              }
            }
          });
        
        startGallery(div, `.product-main-slide.type-variant.variant-${id}, .product-main-slide.type-default`, `.product__thumb-item.type-variant.variant-${id}, .product__thumb-item.type-default`);
      });
    }
  }

  document.querySelectorAll('.gf_column .gf_swatches .gf_swatch').forEach(function(swatch) {
    swatch.addEventListener('click', function() {
      setTimeout(function() {
        const myURL = new URL(window.location.href); 
        const getParam = myURL.searchParams.get('variant');

        try {
          if(getParam) {
            document.dispatchEvent(new CustomEvent('variant:change', {
              detail : {
                variant: {
                  id: parseInt(getParam, 10)
                }
              }
            }));
          }
        } catch(error) {
          
        }
      }, 10);
    });
  });
})( window.GemQuery || jQuery );
    
  
    (function(jQuery) {
    var $module = jQuery('#m-1676893937078-2').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);
  (function(jQuery) {
  var $module = jQuery('#m-1678884899406').children('.module');
  var swatchText = $module.attr('data-swatch-text') !== undefined ? $module.attr('data-swatch-text') : '1';
  $module.gfV3ProductSwatches({
    swatchText: swatchText,
    onSwatchSelected: function(variant, $swatch) {
      document.dispatchEvent(new CustomEvent('variant:change', {
        detail : {
          variant: variant
        }
      }));
    }
  });
})(window.GemQuery || jQuery);
    (function(jQuery) {
  var $module = jQuery('#m-1678891196230').children('.module');
  var swatchText = $module.attr('data-swatch-text') != undefined ? $module.attr('data-swatch-text') : '1';
  $module.gfV3ProductSwatches({
    swatchText: swatchText,
    onSwatchSelected: function(variant, $swatch) {}
  });
})(window.GemQuery || jQuery);
  
    (function(jQuery) {
  var $module = jQuery('#m-1678970417885').children('.module');
  var swatchText = $module.attr('data-swatch-text') != undefined ? $module.attr('data-swatch-text') : '1';
  $module.gfV3ProductSwatches({
    swatchText: swatchText,
    onSwatchSelected: function(variant, $swatch) {}
  });
})(window.GemQuery || jQuery);
  
    (function( jQuery ){
  try {
    var $module = jQuery('#m-1676895479096').children('.module');
    var single = $module.attr('data-single');
    var openDefault = $module.attr('data-openDefault');
    var openTab = $module.attr('data-openTab');
    var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';

    if(openDefault == 0 || openDefault == '0') {
      openTab = '0';
    }

    $module.gfAccordion({
      single: single,
      openTab: openTab,
      mode: mode,
      onChanged: function() {	
        // Fix (P) Desc read more bug	
        $module.find('.module-wrap[data-label="(P) Description"]').each(function(index, el) {	
          if (jQuery(el).children('.module').data('gfv3productdesc') != undefined) {	
            jQuery(el).children(".module").data("gfv3productdesc").initReadMore();	
          }	
        })	
      }
    });

    var borderColor = $module.attr('data-borderColor');
    var borderSize = $module.attr('data-borderSize');

    $module.children('[data-accordion]').children('[data-control]').css('border-bottom', borderSize + ' solid ' + borderColor);
    $module.children('[data-accordion]').children('[data-content]').children().css('border-bottom', borderSize + ' solid ' + borderColor);
  } catch(err) {}
})( window.GemQuery || jQuery );
  
    
  
    (function( jQuery ){
  var $module = jQuery('#m-1676895681642').children('.module');
  $module.gfV3ProductDesc();
})( window.GemQuery || jQuery );
  
    
  (function( jQuery ){
  // var $module = jQuery('#m-1676895707082').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    
  
    
  