const LEAGUES = [
  {
    id: "premier-league", name: "Premier League", country: "Inglaterra",
    jerseys: [
      { id: "pl-1", team: "Manchester United", edition: "Home Kit", season: "25/26", price: 89.99, originalPrice: 119.99, image: "assets/United.jpg", badge: "SALE" },
      { id: "pl-2", team: "Chelsea", edition: "Home Kit", season: "25/26", price: 94.99, image: "assets/Chelsea.jpg", badge: "NEW" },
      { id: "pl-3", team: "Arsenal", edition: "Away Kit", season: "25/26", price: 84.99, image: "assets/Arsenal.jpg" },
       { id: "pl-4", team: "Liverpool", edition: "Away Kit", season: "25/26", price: 84.99, image: "assets/Liverpool.jpg" },
      { id: "pl-5", team: "Tottenham", edition: "Away Kit", season: "25/26", price: 84.99, image: "assets/Tottenham.jpg" },
      { id: "pl-6", team: "Manchester City", edition: "Third Kit", season: "25/26", price: 99.99, image: "assets/City.jpg", badge: "HOT" },
    ],
  },  
  {
    id: "la-liga", name: "La Liga", country: "Espanha",
    jerseys: [
      {id:"ll-1",team:"Real Madrid",edition:"Home Kit",season:"25/26",price:99.99,image:"assets/real_madrid.jpg",badge:"HOT"},
    {id:"ll-2",team:"Barcelona",edition:"Home Kit",season:"25/26",price:94.99,image:"assets/Barcelona.jpg"},
    {id:"ll-3",team:"Atletico de Madrid",edition:"Home Kit",season:"25/26",price:84.99,originalPrice:109.99,image:"assets/a_madrid.jpg",badge:"SALE"},
    {id:"ll-4",team:"Real Betis",edition:"Away Kit",season:"25/26",price:79.99,image:"assets/Betis.jpg"},
    ],
  },
  {
    id: "serie-a", name: "Serie A", country: "Italia",
    jerseys: [
     {id:"sa-1",team:"Inter de Milão",edition:"Home Kit",season:"25/26",price:89.99,image:"assets/inter_milao.jpg",badge:"NEW"},
    {id:"sa-2",team:"Milan",edition:"Home Kit",season:"25/26",price:89.99,image:"assets/Milan.jpg"},
    {id:"sa-3",team:"Juventus",edition:"Home Kit",season:"25/26",price:89.99,image:"assets/Juventus.jpg"},
    {id:"sa-4",team:"Napoli",edition:"Home Kit",season:"25/26",price:84.99,originalPrice:104.99,image:"assets/Napoli.jpg",badge:"SALE"},
    ],
  },
  {
    id: "bundesliga", name: "Bundesliga", country: "Alemanha",
    jerseys: [
         {id:"bl-1",team:"Bayern München",edition:"Home Kit",season:"25/26",price:89.99,image:"assets/Bayern.jpg",badge:"HOT"},
    {id:"bl-2",team:"Borussia Dortmund",edition:"Home Kit",season:"25/26",price:84.99,image:"assets/Borussia.jpg",badge:"NEW"},
    {id:"bl-3",team:"VfB Stuttgart",edition:"Home Kit",season:"25/26",price:79.99,image:"assets/Stuttgart.jpg"},
    {id:"bl-4",team:"Bayer 04 Leverkusen",edition:"Home Kit",season:"25/26",price:79.99,image:"assets/Bayer.jpg"},
    ],
  },
  {
    id: "ligue-1", name: "Ligue 1", country: "França",
    jerseys: [
      { id: "l1-1", team: "Paris Saint-Germain", edition: "Home Kit", season: "25/26", price: 99.99, image: "assets/psg.jpg", badge: "HOT" },
      { id: "l1-2", team: "Olympique Lyon", edition: "Home Kit", season: "25/26", price: 84.99, image: "assets/Lyon.jpg" },
      { id: "l1-3", team: "Olympique de Marseille", edition: "Away Kit", season: "25/26", price: 79.99, originalPrice: 99.99, image: "assets/Olympique.jpg", badge: "SALE" },
      { id: "l1-4", team: "Monaco ", edition: "Home Kit", season: "25/26", price: 84.99, image: "assets/Monaco.jpg" },
    ],
  },
  {
    id: "national", name: "Seleções", country: "Internacional",
    jerseys: [
      { id: "nt-1", team: "Brasil", edition: "Home Kit", season: "24/25", price: 94.99, image: "assets/Brasil.jpg", badge: "HOT" },
      { id: "nt-2", team: "Argentina", edition: "Home Kit", season: "24/25", price: 94.99, image: "assets/argentina.jpg", badge: "HOT" },
      { id: "nt-3", team: "França", edition: "Home Kit", season: "24/25", price: 89.99, image: "assets/Franca.jpg" },
      { id: "nt-4", team: "Alemanha", edition: "Home Kit", season: "24/25", price: 89.99, originalPrice: 109.99, image: "assets/Alemanha.jpg", badge: "SALE" },
      { id: "nt-5", team: "Holanda", edition: "Home Kit", season: "24/25", price: 89.99, originalPrice: 109.99, image: "assets/Holanda.jpg", badge: "SALE" },
      { id: "nt-6", team: "Portugal", edition: "Home Kit", season: "24/25", price: 89.99, originalPrice: 109.99, image: "assets/Portugal.jpg", badge: "SALE" },
      { id: "nt-7", team: "Espanha", edition: "Home Kit", season: "24/25", price: 89.99, originalPrice: 109.99, image: "assets/Espanha.jpg", badge: "SALE" },
    ],
  },
];