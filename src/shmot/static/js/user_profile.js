function relevantClick() {
    $('#relevant').addClass('active');
    $('#relevant_items').removeClass('hidden');
    $('#sold').removeClass('active');
    $('#sold_items').addClass('hidden');
}
function soldClick() {
    $('#sold').addClass('active');
    $('#sold_items').removeClass('hidden');
    $('#relevant').removeClass('active');
    $('#relevant_items').addClass('hidden');
}