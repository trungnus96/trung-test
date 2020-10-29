import Bugsnag from "@bugsnag/js";

export function sendErrorToBugSnag({
  error,
  metadata_name = "",
  metadata_payload = {},
  ...rest
}) {
  Bugsnag.notify(error, function (event) {
    if (metadata_name) {
      event.addMetadata(metadata_name, {
        ...metadata_payload,
        other_data: rest,
      });
    }
  });
}
