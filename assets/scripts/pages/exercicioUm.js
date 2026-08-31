import {
  formatPriceDecimal,
  formatOrdersExtreme,
  formatReportTotal,
} from "../utils/formatFunctions.js";
import {
  formRegistrationTemplate,
  formSettingTemplate,
  handleFinishForms,
} from "../utils/formTemplate.js";
import { avgBy, extremeBy, sumBy } from "../utils/helpers.js";

export function init() {
  let gasPrice = 0;
  const ordersList = [];

  const setupConfig = {
    gas: { htmlId: "gas" },
  };

  const registrationConfig = {
    fields: {
      id: { htmlId: "ord-id", required: "id" },
      region: { htmlId: "ord-region" },
      distance: { htmlId: "ord-distance" },
      quantity: { htmlId: "ord-qtd-parts" },
      hasTracking: { htmlId: "ord-tracking", type: "checkbox" },
    },
    calculate: (data) => ({
      ...data,
      orderTotal: calcOrderTotal(
        data.quantity,
        data.region,
        data.distance,
        data.hasTracking,
        gasPrice,
      ),
    }),
  };

  formSettingTemplate(setupConfig, (data) => {
    gasPrice = Number(data.gas);
  });

  formRegistrationTemplate(registrationConfig, ordersList);

  handleFinishForms(ordersList, generateReport, renderProperties);
}

function calcOrderTotal(qtd, reg, dist, track, gas) {
  const numQtd = Number(qtd);
  const numDist = Number(dist);

  const unitPrices = { opt1: 1.2, opt2: 1.3, opt3: 1.5 };
  const basePrice = unitPrices[reg] || 1.0;

  let partsPrice = 0;

  if (numQtd > 1000) {
    const normalUnits = 1000 * basePrice;
    const extraUnits = (numQtd - 1000) * (basePrice * 0.88);
    partsPrice = normalUnits + extraUnits;
  } else {
    partsPrice = numQtd * basePrice;
  }

  let distPrice = numDist * gas;
  const trackingPrice = track ? 200 : 0;

  return partsPrice + distPrice + trackingPrice;
}

function generateReport(list) {
  function sumRegionBy(option) {
    return sumBy(
      list.filter((o) => o.region === option),
      "orderTotal",
    );
  }

  const mediumPerOrder = avgBy(list, "orderTotal");
  const totalPerRegion = {
    southeast: sumRegionBy("opt1"),
    south: sumRegionBy("opt2"),
    midwest: sumRegionBy("opt3"),
  };

  const expensiveOrder = extremeBy(list, "orderTotal");
  const cheapestOrder = extremeBy(list, "orderTotal", "min");

  return {
    total: list.length,
    mediumPerOrder,
    totalPerRegion,
    expensiveOrder,
    cheapestOrder,
  };
}

const renderProperties = [
  { htmlId: "rep-total", data: "total", formatFunc: formatReportTotal },
  {
    htmlId: "rep-order-avg",
    data: "mediumPerOrder",
    formatFunc: formatPriceDecimal,
  },
  {
    htmlId: "rep-reg",
    data: (report) => report.totalPerRegion,
    formatFunc: (tpr) => {
      const labels = [
        { key: "south", title: "Sul" },
        { key: "southeast", title: "Sudeste" },
        { key: "midwest", title: "Centro-Oeste" },
      ];

      return labels
        .map(
          ({ key, title }) => `
        <div class="report__grid report__grid--half">
          <h4><span>R$</span> ${formatPriceDecimal(tpr[key])}</h4>
          <span>${title}</span>
        </div>
      `,
        )
        .join("");
    },
  },
  {
    htmlId: "rep-exp",
    data: (report) => report.expensiveOrder,
    formatFunc: formatOrdersExtreme,
  },
  {
    htmlId: "rep-cheap",
    data: (report) => report.cheapestOrder,
    formatFunc: formatOrdersExtreme,
  },
];
