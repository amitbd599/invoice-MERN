import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode-generator";

function TemplateSix({ getSetting, templateData, print, view, save }) {
  const pdf = new jsPDF(
    getSetting?.pageOrientation,
    "mm",
    getSetting?.pageSize
  );

  pdf.setFont("inter", "normal");
  // Logo
  getSetting?.logo.length !== 0 &&
    pdf.addImage(getSetting?.logo, "JPEG", 15, 8, 0, 14);

  pdf.setDrawColor(0);
  pdf.setFillColor(
    getSetting?.themeColor?.r,
    getSetting?.themeColor?.g,
    getSetting?.themeColor?.b
  );
  pdf.rect(-10, 44, 400, 1, "F");

  pdf.setFontSize(40);
  pdf.setFont("inter", "bold");
  pdf.setTextColor(0, 0, 0);
  pdf.setFont("inter", "normal");
  pdf.setFontSize(12);
  pdf.text(
    `INVOICE # ${templateData?.invoiceID}`,
    pdf.internal.pageSize.width - 15,
    15,
    {
      align: "right",
    }
  );
  pdf.setFontSize(11);
  pdf.text(
    `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
    pdf.internal.pageSize.width - 15,
    20,
    {
      align: "right",
    }
  );
  pdf.text(
    `Submit date:  ${templateData?.startDate.toISOString().slice(0, 10)}`,
    pdf.internal.pageSize.width - 15,
    26,
    {
      align: "right",
    }
  );
  pdf.text(
    `Delivery date:  ${templateData?.deliveryDate.toISOString().slice(0, 10)}`,
    pdf.internal.pageSize.width - 15,
    32,
    {
      align: "right",
    }
  );
  pdf.text(
    `Writer:  ${templateData?.invoiceWriter}`,
    pdf.internal.pageSize.width - 15,
    38,
    {
      align: "right",
    }
  );

  pdf.text(`${getSetting?.company_name}`, 15, 28);
  pdf.setFontSize(10);
  pdf.text(`${getSetting?.company_address}`, 15, 33);
  pdf.text(
    `${getSetting?.email}, ${getSetting?.mobile}, ${getSetting?.website}`,
    15,
    38
  );

  // Right side data
  let templateTwoRightStart = parseInt(pdf.internal.pageSize.width) / 2;
  pdf.setFontSize(10);
  pdf.text("Bill To", 15, 57);
  // company_name
  pdf.setFontSize(12);
  pdf.setFont("inter", "bold");
  pdf.text(`${templateData?.customerName}`, 15, 62);
  pdf.setFont("inter", "normal");
  pdf.setFontSize(10);
  pdf.text(`${templateData?.address}`, 15, 67);
  pdf.text(`Phone: ${templateData?.phone}`, 15, 72);
  pdf.text(`Email: ${templateData?.email}`, 15, 77);

  // Filled red square
  pdf.setDrawColor(0);
  pdf.setFontSize(10);
  pdf.text("Payment info", templateTwoRightStart + 20, 57);
  pdf.setFontSize(12);
  pdf.setFont("inter", "bold");
  pdf.text(
    `Payment method: ${templateData?.paymentMethod}`,
    templateTwoRightStart + 20,
    62
  );
  pdf.setFont("inter", "normal");
  pdf.setFontSize(10);
  templateData?.paymentMethod === "Bank" &&
    pdf.text(
      `A/C name:  ${templateData?.accountName}`,
      templateTwoRightStart + 20,
      67
    );
  templateData?.paymentMethod === "Bank" &&
    pdf.text(
      `A/C no: ${templateData?.accountNumber}`,
      templateTwoRightStart + 20,
      72
    );
  templateData?.paymentMethod === "Bank" &&
    pdf.text(
      `Branch: ${templateData?.branchName}`,
      templateTwoRightStart + 20,
      77
    );

  // Table Item
  autoTable(pdf, {
    startY: 82,
    theme: "striped",
    headStyles: {
      halign: "left",
      fillColor: [
        getSetting?.themeColor?.r,
        getSetting?.themeColor?.g,
        getSetting?.themeColor?.b,
      ],
      textColor: [
        getSetting?.themeTextColor?.r,
        getSetting?.themeTextColor?.g,
        getSetting?.themeTextColor?.b,
      ],
    },
    columnStyles: {
      halign: "left",
    },
    body: templateData?.invoiceItems,
    columns: [
      { header: "Item", dataKey: "item" },
      { header: "Quantity", dataKey: "quantity" },
      { header: `Rate(${templateData?.currency})`, dataKey: "rate" },
      { header: `Amount(${templateData?.currency})`, dataKey: "amount" },
    ],
  });
  // Table payment calculation
  let data = [
    ["Subtotal", templateData?.subTotal],
    [
      `${templateData?.taxationName}(${templateData?.taxationPercent}%)`,
      templateData?.taxation,
    ],
    ["Shipping", templateData?.shipping],
    ["Discount", `(${templateData?.discount})`],
    ["Total", templateData?.total],
    ["Payment", `(${templateData?.payment})`],
    ["Due", templateData?.due],
  ];
  var styles = {
    fontStyle: "bold",
    fontSize: 10,
    textColor: 0,
    halign: "left",
  };
  autoTable(pdf, {
    tableWidth: 70,
    margin: { left: pdf.internal.pageSize.width - 84, bottom: 40 },
    body: data,
    styles: styles,
    theme: "plain",
    headStyles: {
      europe: { halign: "right" },
      fillColor: [0, 0, 0],
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { fontStyle: "normal" },
    },
  });

  // Footer
  pdf.setFontSize(14);

  pdf.text(
    "Authorized Signature",
    pdf.internal.pageSize.width - 15,
    pdf.internal.pageSize.height - 23,
    {
      align: "right",
    }
  );
  pdf.setFontSize(10);
  pdf.setDrawColor(0);
  pdf.setFillColor(
    getSetting?.themeColor?.r,
    getSetting?.themeColor?.g,
    getSetting?.themeColor?.b
  );
  pdf.rect(-10, pdf.internal.pageSize.height - 15, 400, 1, "F");
  let splitTitle = pdf.splitTextToSize(
    getSetting?.footerText,
    pdf.internal.pageSize.width - 15
  );
  pdf.text(splitTitle, 10, pdf.internal.pageSize.height - 7);

  // Your QR code content
  const qrCodeContent = `Invoice Id #-${templateData?.invoiceID}`;
  const typeNumber = 0;
  const errorCorrectionLevel = "L";
  const qr = QRCode(typeNumber, errorCorrectionLevel);
  qr.addData(qrCodeContent);
  qr.make();
  const qrCodeImageUri = qr.createDataURL();
  let qrWidth = 20; // Set the width of your image
  let qrHeight = 20; // Set the height of your image
  getSetting?.qrCode === "yes" &&
    pdf.addImage(
      qrCodeImageUri,
      "PNG",
      7,
      pdf.internal.pageSize.height - 58,
      qrWidth,
      qrHeight
    );

  let note = pdf.splitTextToSize(`Note: ${templateData?.note}`, 120);
  pdf.text(note, 10, pdf.internal.pageSize.height - 35);

  for (let i = 1; i <= pdf.internal.getNumberOfPages(); i++) {
    pdf.setPage(i);
    // Water nark
    pdf.setFontSize(200);
    pdf.saveGraphicsState();
    pdf.setGState(new pdf.GState({ opacity: 0.1 }));
    // Bg image
    let imgWidth = 100; // Set the width of your image
    let imgHeight = 0; // Set the height of your image
    let centerImgX = (pdf.internal.pageSize.width - imgWidth) / 2;
    let centerImgY = (pdf.internal.pageSize.height - imgHeight) / 2;

    // Add the image to the PDF at the center position

    getSetting?.bgImg?.length !== 0 &&
      pdf.addImage(
        getSetting?.bgImg,
        "JPEG",
        centerImgX,
        centerImgY,
        imgWidth,
        imgHeight
      );

    // water mark
    pdf.addImage(
      "/image/shape/demo.png",
      "JPEG",
      centerImgX,
      20,
      imgWidth,
      imgHeight
    );
    pdf.restoreGraphicsState();
  }

  pdf.setProperties({
    title: "Report view in PDF",
  });
  // Save the PDF

  if (print === true) {
    pdf.autoPrint();
    pdf.output("dataurlnewwindow");
  }

  view === true && pdf.output("dataurlnewwindow");
  save === true && pdf.save("invoice.pdf");
}

export default TemplateSix;
