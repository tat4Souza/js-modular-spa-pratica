export function formatPrice(price) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatPriceDecimal(value) {
  const newVal = Number(value);

  if (Number.isNaN(newVal)) return "0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(newVal);
}

export function formatReportTotal(total) {
  return `${total} Entrada(s) `;
}

export function formatProductInfo(products) {
  if (!Array.isArray(products) || products.length === 0) {
    return "<p>Nenhum produto registrado.</p>";
  }

  return products
    .map(
      (item) => `
        <div class="report__grid report__grid--full report__grid--full--col">
          <h4>Pedido ${item.id}</h4>
          <p><strong>Estoque final:</strong> <span>${item.totalStock}</span></p>
          <p><strong>Valor investido:</strong> <span>${formatPrice(item.totalValue)}</span></p>
        </div>`,
    )
    .join("");
}

export function formatPlayers(players) {
  if (!Array.isArray(players) || players.length === 0) {
    return "<p>Nenhum jogador registrado.</p>";
  }

  return players
    .map(
      (p) => `
        <div class="report__grid report__grid--full report__grid--full--col">
          <h4>Jogador ${p.name}</h4>
          <p><strong>Carga Semanal Total:</strong> <span>${p.totalLoad} pts </span></p>
          <p><strong>Quantidade de Treinos:</strong> <span>${p.totalWorkouts} </span></p>
        </div>`,
    )
    .join("");
}

export function formatLoadExtremes(obj) {
  const formatPositionName = (pos) => {
    const dict = {
      opt1: "Goleiro",
      opt2: "Zagueiro",
      opt3: "Meio-Campo",
      opt4: "Atacante",
    };
    return dict[pos];
  };

  return `
    <p><strong>Nome:</strong> <span> ${obj.name} </span></p>
    <p><strong>Posição:</strong> <span> ${formatPositionName(obj.position)} </span></p>
    <p><strong>Número de treinos:</strong> <span> ${obj.totalWorkouts} </span></p>
  `;
}

export function formatMostSalesSeller(obj) {
  return `
    <p><strong>ID Vendedor:</strong> <span>${obj.sellerId}</span></p>
    <p><strong>Valor total vendido:</strong> <span>${formatPrice(obj.totalValue)}</span></p>
  `;
}

export function formatMostComissionsSeller(obj) {
  return `
    <p><strong>ID Vendedor:</strong> <span> ${obj.sellerId} </span></p>
    <p><strong>Comissão total acumulada:</strong> <span> ${formatPrice(obj.totalComission)} </span></p>
  `;
}

export function formatOrdersExtreme(obj) {
  return `
    <p><strong>Código:</strong> <span>${obj.id}</span></p>
    <p><strong>Valor Total:</strong> <span>${formatPrice(obj.orderTotal)}</span></p>
  `;
}

export function formatEmployeesExtreme(obj) {
  const formatCategory = (category) => {
    return category === "opt1" ? "Funcionário Operacional" : "Gerente";
  };

  const formatShift = (shift) => {
    return shift === "opt1"
      ? "Matutino"
      : shift === "opt2"
        ? "Vespertino"
        : "Noturno";
  };

  return `
    <p><strong>Código:</strong> <span>${obj.id}</span></p>
    <p><strong>Categoria:</strong>  <span>${formatCategory(obj.category)}</span></p>
    <p><strong>Turno:</strong> <span>${formatShift(obj.shift)}</span></p>
    <p><strong>Valor Recebido:</strong> <span>${formatPrice(obj.finalWage)}</span></p>
  `;
}

export function formatStockExtreme(obj) {
  return `
    <p><strong>Código:</strong> <span>${obj.id}</span></p>
    <p><strong>Valor:</strong>  <span>${formatPrice(obj.total)}</span></p>
  `;
}

export function formatResExtreme(obj) {
  const formatRoomType = (type) => {
    return type === "opt1" ? "Standard" : type === "opt2" ? "Luxo" : "Premium";
  };

  const formatSeason = (sea) => {
    return sea === "opt1" ? "Baixa" : sea === "opt2" ? "Alta" : "Feriado";
  };

  return `
    <p><strong>Código: </strong> <span>${obj.id}</span></p>
    <p><strong>Tipo: </strong><span>${formatRoomType(obj.roomType)}</span></p>
    <p><strong>Temporada: </strong><span>${formatSeason(obj.season)}</span></p>
    <p><strong>Hóspedes: </strong><span>${obj.guests}</span></p>
    <p><strong>Valor: </strong><span>${formatPrice(obj.reservTotal)}</span></p>
  `;
}
