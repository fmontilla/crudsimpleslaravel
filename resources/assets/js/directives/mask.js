import Vue from '../vue'

function setMask(el, binding, vnode) {
    $(el).unsetMask();
    switch (binding.value) {
        case 'phone':
            let phone = el.value.replace(/\D/g, '');
            if (phone.length > 10) {
                $(el).setMask({mask: '(99)99999-9999', autoTab: false})
            } else {
                $(el).setMask({mask: '(99)9999-99999', autoTab: false})
            }
            break;
        default:
            if (binding.value) {
                $(el).setMask({mask: binding.value});
            }
    }
    $(el).trigger('input', [$(el).val()]);
}

Vue.directive('mask', {
    bind (el, binding, vnode) {
        setMask(el, binding, vnode);
    },
    update (el, binding, vnode) {
        setMask(el, binding, vnode);
    }
});
