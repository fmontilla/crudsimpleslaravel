import $ from 'jquery'

let modals = [];
$(document).on('shown.bs.modal', '.modal', function () {
    let zIndex;
    if (modals.length) {
        const $modal = $(modals[modals.length - 1]);
        try {
            $modal.data('bs.modal').$backdrop.hide();
            zIndex = parseInt($modal.css('z-index'));
            $(this)[0].style.setProperty('z-index', zIndex + 2, 'important');
            $(this).data('bs.modal').$backdrop[0].style.setProperty('z-index', zIndex + 1, 'important');
        } catch (e) { }
    }
    modals.push(this);
}).on('hidden.bs.modal', '.modal', function () {
    modals = modals.filter(modal => modal !== this);
    if (modals.length) {
        const $lastModal = $(modals[modals.length - 1]);
        $lastModal.data('bs.modal').$backdrop.show();
    }
});
