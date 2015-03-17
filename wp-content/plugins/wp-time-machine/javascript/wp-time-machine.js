function wpTimeMachine_toggle(key, negative, positive) {

    if (jQuery("#" + key).attr("value") === "false" || jQuery("#" + key).attr("value") === false) {
        var val = true;
        jQuery("#" + key).html(negative).removeClass("wpTM_unchecked").addClass("wpTM_checked");
    } else {
        var val = false;
        jQuery("#" + key).html(positive).removeClass("wpTM_checked").addClass("wpTM_unchecked");
    }

    if (key === "show_info" || key === "show_options") {
        jQuery("#" + key).removeClass("wpTM_checked").removeClass("wpTM_unchecked");
    }

    if (key === "format") {

        if (jQuery("#" + key).attr("value") === "zip") {
            jQuery("#" + key).text(negative).attr("value", "tar");
            jQuery("#" + key + "_label").text(".tar.gz");
        } else {
            jQuery("#" + key).text(positive).attr("value", "zip");
            jQuery("#" + key + "_label").text(".zip");
        }

        var val = jQuery("#" + key).attr("value");

    }

    jQuery("#" + key).attr("value", val);

    if (key === "use_timestamp_dir") {
        jQuery("input[name='use_timestamp_dir']").val(val);
    }

    if (key === "use_post_pub") {
        jQuery("input[name='use_post_pub']").val(val);
    }

    var __time__ = new Date().getTime();

    jQuery.ajax({
        data: "page=wpTimeMachineCore.php&time=" + __time__ + "&ajax=1&" + key + "=" + val,
        url: "options-general.php"
    });

}

function wpTimeMachine_toggle_host_field(offsite) {

    var rh_fields = jQuery("label[for='remote_host'],input[name='remote_host'],#remote_host_advice");

    (offsite != "ftp") ? rh_fields.hide() : rh_fields.show();

}

function show_help(_for) {

    jQuery('p.help').hide();

    jQuery(_for).show();

}

jQuery(document).ready(function () {

    wpTimeMachine_toggle_host_field(offsite);

    jQuery(".remote_pass_label").text(remote_pass_label);

    jQuery("a[value='false']").each(function () {
        jQuery(this).addClass("wpTM_unchecked");
    });

    jQuery("a[value='true']").each(function () {
        jQuery(this).addClass("wpTM_checked");
    });

    jQuery("#show_info").click(function (event) {
        event.preventDefault();
        jQuery("#Info").toggle();
        //jQuery(".wpTimeMachineOptions").hide();
    });

    jQuery("#use_log").click(function (event) {
        event.preventDefault();
        wpTimeMachine_toggle("use_log", use_log_labels[0], use_log_labels[1]);
    });

    jQuery("#show_options").click(function (event) {
        event.preventDefault();
        jQuery(".wpTimeMachineOptions").toggle();
        //jQuery("#Info").hide();
    });

    jQuery("#format").click(function (event) {
        event.preventDefault();
        wpTimeMachine_toggle("format", format_labels[0], format_labels[1]);
    });

    jQuery("#use_post_pub").click(function (event) {
        event.preventDefault();
        wpTimeMachine_toggle("use_post_pub", use_post_pub_labels[0], use_post_pub_labels[1]);
    });

    jQuery("#use_timestamp_dir").click(function (event) {
        event.preventDefault();
        wpTimeMachine_toggle("use_timestamp_dir", use_timestamp_dir_labels[0], use_timestamp_dir_labels[1]);
    });

    jQuery("#exclude_cache").click(function (event) {
        event.preventDefault();
        wpTimeMachine_toggle("exclude_cache", exclude_cache_labels[0], exclude_cache_labels[1]);
    });

    jQuery("#remote_pass_storage").click(function (event) {
        event.preventDefault();
        wpTimeMachine_toggle("remote_pass_storage", remote_pass_storage_labels[0], remote_pass_storage_labels[1]);
    });

    jQuery("#clear_log").click(function (event) {
        event.preventDefault();

        var __time__ = new Date().getTime();

        jQuery.ajax({
            data: "page=wpTimeMachineCore.php&clear_log=true&_ajax_nonce=" + __nonce__ + "&time=" + __time__,
            url: "options-general.php"
        });

    });

    jQuery(".rd").click(function () {

        var offsite = jQuery(this).val();
        wpTimeMachine_switch_offsite_labels(offsite);

        jQuery.ajax({
            data: "page=wpTimeMachineCore.php&ajax_settings_only=1&set_offsite=1&offsite=" + offsite,
            url: "options-general.php"
        });

    });

    jQuery('#submit_package_request').click(function () {

        var __time__ = new Date().getTime();
        var __actn__ = jQuery("#wpTimeMachine_generator_form").attr("action");
        jQuery("#wpTimeMachine_generator_form").attr("action", __actn__ + "&time=" + __time__);

    });

    jQuery('#wpTimeMachine_generator_form').ajaxForm({
        beforeSubmit: function () {

            jQuery.modal.close();

            jQuery("div.wpTimeMachine_progress").modal({
                opacity: 80,
                overlayCss: {
                    backgroundColor: "#fff"
                }
            });

        },
        success: function (response) {

            jQuery.modal.close();

            var recent_status = jQuery(response).find("span#update").text();

            jQuery("div#RecentInfo")
                .css({
                    "opacity": "1.0",
                    "display": "block"
                })
                .html(
                    recent_status
                );

            if (recent_status == "Archiving failed") {

                jQuery("div.wpTimeMachine_error").modal({
                    opacity: 80,
                    overlayCss: {
                        backgroundColor: "#fff"
                    }
                });

            } else {

                jQuery("div.wpTimeMachine_complete").modal({
                    opacity: 80,
                    overlayCss: {
                        backgroundColor: "#fff"
                    }
                });

                jQuery.ajax({
                    async: false,
                    data: "page=wpTimeMachineCore.php&clean=1",
                    url: "options-general.php"
                });

            }

        },
        error: function () {

            jQuery.modal.close();

            jQuery("div.wpTimeMachine_error").modal({
                opacity: 80,
                overlayCss: {
                    backgroundColor: "#fff"
                }
            });

        }
    });

});
