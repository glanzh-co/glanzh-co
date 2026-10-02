jQuery(function($){
  $(document).on('click', '.dp-faqs-question', function(){
    const btn = $(this);
    const item = btn.closest('.dp-faqs-item');
    const container = btn.closest('.dp-faqs');
    const multi = String(container.data('multi-expand')) === '1';
    const expanded = btn.attr('aria-expanded') === 'true';

    if (!multi) {
      container.find('.dp-faqs-item').not(item).removeClass('is-open').find('.dp-faqs-question').attr('aria-expanded', 'false');
      container.find('.dp-faqs-item').not(item).find('.dp-faqs-answer').slideUp(350, function () { $(this).attr('hidden', true);});
    }

    item.toggleClass('is-open', !expanded);
    btn.attr('aria-expanded', expanded ? 'false' : 'true');
    const answer = item.find('.dp-faqs-answer').first();
    if (expanded) {
      answer.slideUp(350, function () {
        $(this).attr('hidden', true);
      });
    } else {
      answer.slideDown(350, function () {
        $(this).removeAttr('hidden');
      });
    }
  });

  $('.dp-faqs').each(function(){
    const initial = String($(this).data('initial-state'));
    if (initial === 'open_all') {
      $(this).find('.dp-faqs-answer').show().removeAttr('hidden');
    } else {
      $(this).find('.dp-faqs-answer[hidden]').hide();
    }
  });
});
