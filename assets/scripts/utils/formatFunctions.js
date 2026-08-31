export function formatPrice(price) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
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
          <p><strong>Estoque final:</strong> ${item.totalStock}</p>
          <p><strong>Valor investido:</strong> ${formatPrice(item.totalValue)}</p>
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
          <p><strong>Carga Semanal Total:</strong> ${p.totalLoad}</p>
          <p><strong>Quantidade de Treinos:</strong> ${p.totalWorkouts}</p>
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
    <p><strong>Nome:</strong> ${obj.name}</p>
    <p><strong>Posição:</strong> ${formatPositionName(obj.position)}</p>
    <p><strong>Número de treinos:</strong> ${obj.totalWorkouts}</p>
  `;
}

export function formatMostSalesSeller(obj) {
  return `
    <p><strong>ID Vendedor:</strong> ${obj.sellerId}</p>
    <p><strong>Valor total vendido:</strong> ${formatPrice(obj.totalValue)}</p>
  `;
}

export function formatMostComissionsSeller(obj) {
  return `
    <p><strong>ID Vendedor:</strong> ${obj.sellerId}</p>
    <p><strong>Comissão total acumulada:</strong> ${formatPrice(obj.totalComission)}</p>
  `;
}

export function formatOrdersExtreme(obj) {
  return `
    <p><strong>Código:</strong> ${obj.id}</p>
    <p><strong>Valor Total:</strong> ${formatPrice(obj.orderTotal)}</p>
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
    <p><strong>Código:</strong> ${obj.id}</p>
    <p><strong>Categoria:</strong>  ${formatCategory(obj.category)}</span></p>
    <p><strong>Turno:</strong> ${formatShift(obj.shift)}</span></p>
    <p><strong>Valor Recebido:</strong> ${formatPrice(obj.finalWage)}</span></p>
  `;
}

export function formatStockExtreme(obj) {
  return `
    <p><strong>Código:</strong> ${obj.id}</p>
    <p><strong>Valor:</strong>  ${formatPrice(obj.total)}</span></p>
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
    <p><strong>Código: </strong> ${obj.id}</p>
    <p><strong>Tipo: </strong>${formatRoomType(obj.roomType)}</p>
    <p><strong>Temporada: </strong>${formatSeason(obj.season)}</p>
    <p><strong>Hóspedes: </strong>${obj.guests}</p>
    <p><strong>Valor: </strong>${formatPrice(obj.reservTotal)}</p>
  `;
}
