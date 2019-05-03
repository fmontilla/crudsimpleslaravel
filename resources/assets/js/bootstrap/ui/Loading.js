class Loading {
    static loading = false
    static toLoading = null
    static on () {
        if (!Loading.loading) {
            const html = `
                    <div id="dialogLoading" class="modal modal-ajax-loading" hidden>
                        <div class="modal-content">
                            <i class="fa fa-refresh fa-spin fa-4x fa-fw"></i>
                        </div>
                    </div>
            `;
            $(html).appendTo($('body'));

            if (Loading.toLoading !== null) {
                window.clearTimeout(Loading.toLoading)
            }
            $('#dialogLoading').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            }).on('hidden.bs.modal', function () {
                $(this).remove();
                Loading.loading = false;
            });

            Loading.loading = true
        }
    }

    static off () {
        if (Loading.loading) {
            Loading.toLoading = setTimeout(function () {
                $('#dialogLoading').modal('hide')
            }, 1000)
        }
    }
}

export default Loading
// module.exports = Loading;
