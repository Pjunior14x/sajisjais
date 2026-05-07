const LEAGUES = [
  {
    id: "brasileirao", name: "Brasileirão", country: "Brasil",
    jerseys: [
      { id: "pl-1", team: "Palmeiras", edition: "Home Kit", season: "23/24", price: 94.99, image: "assets/palmeiras.jpg", badge: "SALE" },
      { id: "pl-2", team: "Corinthians", edition: "Home Kit", season: "24/25", price: 94.99, image: "assets/corinthians.jpg", badge: "NEW" },
    ],
  },  

  {
    id: "premier-league", name: "Premier League", country: "Inglaterra",
    jerseys: [
      { id: "pl-1", team: "Manchester United", edition: "Home Kit", season: "25/26", price: 89.99, originalPrice: 119.99, image: "assets/united.jpg", badge: "SALE" },
      { id: "pl-2", team: "Chelsea", edition: "Home Kit", season: "25/26", price: 94.99, image: "assets/chelsea.jpg", badge: "NEW" },
      { id: "pl-3", team: "Arsenal", edition: "Away Kit", season: "25/26", price: 84.99, image: "assets/arsenal.jpg" },
       { id: "pl-4", team: "Liverpool", edition: "Away Kit", season: "25/26", price: 84.99, image: "assets/liverpool.jpg" },
      { id: "pl-5", team: "Tottenham", edition: "Away Kit", season: "25/26", price: 84.99, image: "assets/tottenham.jpg" },
      { id: "pl-6", team: "Manchester City", edition: "Third Kit", season: "25/26", price: 99.99, image: "assets/city.jpg", badge: "HOT" },
    ],
  },  
    {
    id: "la-liga", name: "La Liga", country: "Espanha",
    jerseys: [
      {id:"ll-1",team:"Real Madrid",edition:"Home Kit",season:"23/24",price:99.99,image:"assets/real_madrid.jpg",badge:"HOT"},
    {id:"ll-2",team:"Barcelona",edition:"Home Kit",season:"25/26",price:94.99,image:"assets/barcelona.jpg"},
    {id:"ll-3",team:"Atletico de Madrid",edition:"Home Kit",season:"25/26",price:84.99,originalPrice:109.99,image:"assets/a_madrid.jpg",badge:"SALE"},
    {id:"ll-4",team:"Real Betis",edition:"Away Kit",season:"25/26",price:79.99,image:"assets/betis.jpg"},
    ],
  },
  {
    id: "serie-a", name: "Serie A", country: "Italia",
    jerseys: [
     {id:"sa-1",team:"Inter de Milão",edition:"Home Kit",season:"94/96",price:119.99,image:"assets/inter_milao.jpg",badge:"NEW"},
    {id:"sa-2",team:"Milan",edition:"Home Kit",season:"25/26",price:95.99,image:"assets/milan.jpg"},
    {id:"sa-3",team:"Juventus",edition:"Home Kit",season:"22/23",price:95.99,image:"assets/juventus.jpg"},
    {id:"sa-4",team:"Napoli",edition:"Home Kit",season:"25/26",price:84.99,originalPrice:104.99,image:"assets/napoli.jpg",badge:"SALE"},
    ],
  },
  {
    id: "bundesliga", name: "Bundesliga", country: "Alemanha",
    jerseys: [
         {id:"bl-1",team:"Bayern München",edition:"Home Kit",season:"25/26",price:89.99,image:"assets/bayern.jpg",badge:"HOT"},
    {id:"bl-2",team:"Borussia Dortmund",edition:"Home Kit",season:"25/26",price:87.99,image:"assets/borussia.jpg",badge:"NEW"},
    {id:"bl-3",team:"VfB Stuttgart",edition:"Home Kit",season:"22/23",price:69.99,image:"assets/stuttgart.jpg"},
    {id:"bl-4",team:"Bayer 04 Leverkusen",edition:"Home Kit",season:"25/26",price:79.99,image:"assets/bayer.jpg"},
    ],
  },
  {
    id: "ligue-1", name: "Ligue 1", country: "França",
    jerseys: [
      { id: "l1-1", team: "Paris Saint-Germain", edition: "Home Kit", season: "23/24", price: 99.99, image: "assets/psg.jpg", badge: "HOT" },
      { id: "l1-2", team: "Olympique Lyon", edition: "Home Kit", season: "25/26", price: 79.99, image: "assets/lyon.jpg" },
      { id: "l1-3", team: "Olympique de Marseille", edition: "Away Kit", season: "25/26", price: 79.99, originalPrice: 99.99, image: "assets/olympique.jpg", badge: "SALE" },
      { id: "l1-4", team: "Monaco ", edition: "Home Kit", season: "20/21", price: 80.00, image: "assets/monaco.jpg" },
    ],
  },
  {
    id: "national", name: "Seleções", country: "Internacional",
    jerseys: [
      { id: "nt-1", team: "Brasil", edition: "Home Kit", season: "24/25", price: 100.00, image: "assets/brasil.jpg", badge: "HOT" },
      { id: "nt-2", team: "Argentina", edition: "Home Kit", season: "24/25", price: 94.99, image: "assets/argentina.jpg", badge: "HOT" },
      { id: "nt-3", team: "França", edition: "Home Kit", season: "24/25", price: 79.99, image: "assets/franca.jpg" },
      { id: "nt-4", team: "Alemanha", edition: "Home Kit", season: "24/25", price: 72.99, originalPrice: 109.99, image: "assets/alemanha.jpg", badge: "SALE" },
      { id: "nt-5", team: "Holanda", edition: "Home Kit", season: "24/25", price: 70.00, originalPrice: 109.99, image: "assets/holanda.jpg", badge: "SALE" },
      { id: "nt-6", team: "Portugal", edition: "Home Kit", season: "24/25", price: 94.99, originalPrice: 109.99, image: "assets/portugal.jpg", badge: "SALE" },
      { id: "nt-7", team: "Espanha", edition: "Home Kit", season: "24/25", price: 90.00, originalPrice: 109.99, image: "assets/espanha.jpg", badge: "SALE" },
      { id: "nt-7", team: "Italia", edition: "Home Kit", season: "24/25", price: 70.00, originalPrice: 109.99, image: "assets/italia.jpg", badge: "SALE" },
    ],
  },
];