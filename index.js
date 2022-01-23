/* Control the viewer customization. */
var viewerConfig = {
    showAnnotationTools: true,
    enableFormFilling: true,
};

/* Wait for Adobe Document Services PDF Embed API to be ready */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "<e5ee10a9c8fe4f8a976401beeefef1e7>",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf",
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                headers: [
                    {
                        key: "<HEADER_KEY>",
                        value: "<HEADER_VALUE>",
                    }
                ]
                */
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: "Bodea Brochure.pdf"
        }
    }, viewerConfig);

    /* Define Save API Handler */
    var saveApiHandler = function (metaData, content, options) {
        console.log(metaData, content, options);
        return new Promise(function (resolve, reject) {
            /* Dummy implementation of Save API, replace with your business logic */
            setTimeout(function () {
                var response = {
                    code: AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
                    data: {
                        metaData: Object.assign(metaData, {updatedAt: new Date().getTime()})
                    },
                };
                resolve(response);
            }, 2000);
        });
    };

    adobeDCView.registerCallback(
        AdobeDC.View.Enum.CallbackType.SAVE_API,
        saveApiHandler,
        {}
    );
});
