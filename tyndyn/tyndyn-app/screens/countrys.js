// Definição do objeto countriesWithEmojis
const countriesWithEmojis = {
  Angola: '🇦🇴',
  Argelia: '🇩🇿',
  Benín: '🇧🇯',
  Botswana: '🇧🇼',
  'Burkina Faso': '🇧🇫',
  Burundi: '🇧🇮',
  'Cabo Verde': '🇨🇻',
  Camerún: '🇨🇲',
  Chad: '🇹🇩',
  Comoras: '🇰🇲',
  'Costa de Marfil': '🇨🇮',
  Yibuti: '🇩🇯',
  Egipto: '🇪🇬',
  Eritrea: '🇪🇷',
  eSwatini: '🇸🇿',
  Etiopía: '🇪🇹',
  Gabón: '🇬🇦',
  Gambia: '🇬🇲',
  Ghana: '🇬🇭',
  Guinea: '🇬🇳',
  'Guinea-Bissau': '🇬🇼',
  'Guinea Ecuatorial': '🇬🇶',
  Lesoto: '🇱🇸',
  Liberia: '🇱🇷',
  Libia: '🇱🇾',
  Madagascar: '🇲🇬',
  Malaui: '🇲🇼',
  Malí: '🇲🇱',
  Marruecos: '🇲🇦',
  Mauricio: '🇲🇺',
  Mauritania: '🇲🇷',
  Mozambique: '🇲🇿',
  Namibia: '🇳🇦',
  Níger: '🇳🇪',
  Nigeria: '🇳🇬',
  Kenia: '🇰🇪',
  'República Centroafricana': '🇨🇫',
  'República del Congo': '🇨🇬',
  'República Democrática del Congo': '🇨🇩',
  Ruanda: '🇷🇼',
  'Santo Tomé y Príncipe': '🇸🇹',
  Senegal: '🇸🇳',
  'Sierra Leona': '🇸🇱',
  Seychelles: '🇸🇨',
  Somalia: '🇸🇴',
  Sudán: '🇸🇩',
  'Sudán del Sur': '🇸🇸',
  Tanzania: '🇹🇿',
  Togo: '🇹🇬',
  Túnez: '🇹🇳',
  Uganda: '🇺🇬',
  Zambia: '🇿🇲',
  Zimbabue: '🇿🇼',
  Albania: '🇦🇱',
  Alemania: '🇩🇪',
  Andorra: '🇦🇩',
  Armenia: '🇦🇲',
  Austria: '🇦🇹',
  Azerbaiyán: '🇦🇿',
  Bélgica: '🇧🇪',
  Bielorrusia: '🇧🇾',
  'Bosnia y Herzegovina': '🇧🇦',
  Bulgaria: '🇧🇬',
  Chipre: '🇨🇾',
  Croacia: '🇭🇷',
  Dinamarca: '🇩🇰',
  Eslovaquia: '🇸🇰',
  Eslovenia: '🇸🇮',
  España: '🇪🇸',
  Estonia: '🇪🇪',
  Finlandia: '🇫🇮',
  Francia: '🇫🇷',
  Georgia: '🇬🇪',
  Grecia: '🇬🇷',
  Hungría: '🇭🇺',
  Irlanda: '🇮🇪',
  Islandia: '🇮🇸',
  Italia: '🇮🇹',
  Kosovo: '🇽🇰',
  Letonia: '🇱🇻',
  Liechtenstein: '🇱🇮',
  Lituania: '🇱🇹',
  Luxemburgo: '🇱🇺',
  'Macedonia del Norte': '🇲🇰',
  Malta: '🇲🇹',
  Moldavia: '🇲🇩',
  Mónaco: '🇲🇨',
  Montenegro: '🇲🇪',
  Noruega: '🇳🇴',
  'Países Bajos': '🇳🇱',
  Polonia: '🇵🇱',
  Portugal: '🇵🇹',
  'Reino Unido': '🇬🇧',
  'República Checa': '🇨🇿',
  Rumanía: '🇷🇴',
  Rusia: '🇷🇺',
  'San Marino': '🇸🇲',
  Serbia: '🇷🇸',
  Suecia: '🇸🇪',
  Suiza: '🇨🇭',
  Ucrania: '🇺🇦',
  Vaticano: '🇻🇦',
  Afganistán: '🇦🇫',
  'Arabia Saudita': '🇸🇦',
  Baréin: '🇧🇭',
  Bangladesh: '🇧🇩',
  Brunéi: '🇧🇳',
  Bután: '🇧🇹',
  Camboya: '🇰🇭',
  Catar: '🇶🇦',
  China: '🇨🇳',
  Singapur: '🇸🇬',
  'Corea del Norte': '🇰🇵',
  'Corea del Sur': '🇰🇷',
  'Emiratos Árabes Unidos': '🇦🇪',
  Filipinas: '🇵🇭',
  India: '🇮🇳',
  Indonesia: '🇮🇩',
  Irán: '🇮🇷',
  Irak: '🇮🇶',
  Israel: '🇮🇱',
  Japón: '🇯🇵',
  Jordania: '🇯🇴',
  Kuwait: '🇰🇼',
  Laos: '🇱🇦',
  Líbano: '🇱🇧',
  Malasia: '🇲🇾',
  Maldivas: '🇲🇻',
  Myanmar: '🇲🇲',
  Mongolia: '🇲🇳',
  Nepal: '🇳🇵',
  Omán: '🇴🇲',
  Pakistán: '🇵🇰',
  Kirguistán: '🇰🇬',
  Siria: '🇸🇾',
  'Sri Lanka': '🇱🇰',
  Tayikistán: '🇹🇯',
  Tailandia: '🇹🇭',
  'Timor Oriental': '🇹🇱',
  Turkmenistán: '🇹🇲',
  Turquía: '🇹🇷',
  Uzbekistán: '🇺🇿',
  Vietnam: '🇻🇳',
  Yemen: '🇾🇪',
  'Antigua y Barbuda': '🇦🇬',
  Bahamas: '🇧🇸',
  Barbados: '🇧🇧',
  Belice: '🇧🇿',
  Canadá: '🇨🇦',
  'Costa Rica': '🇨🇷',
  Cuba: '🇨🇺',
  Dominica: '🇩🇲',
  'El Salvador': '🇸🇻',
  'Estados Unidos': '🇺🇸',
  Granada: '🇬🇩',
  Guatemala: '🇬🇹',
  Haití: '🇭🇹',
  Honduras: '🇭🇳',
  Jamaica: '🇯🇲',
  México: '🇲🇽',
  Nicaragua: '🇳🇮',
  Panamá: '🇵🇦',
  'República Dominicana': '🇩🇴',
  'Santa Lucía': '🇱🇨',
  'San Cristóbal y Nieves': '🇰🇳',
  'San Vicente y las Granadinas': '🇻🇨',
  'Trinidad y Tobago': '🇹🇹',
  Argentina: '🇦🇷',
  Djibouti: '🇩🇯',
  Bolivia: '🇧🇴',
  Brasil: '🇧🇷',
  Chile: '🇨🇱',
  Colombia: '🇨🇴',
  Ecuador: '🇪🇨',
  Guayana: '🇬🇾',
  Paraguay: '🇵🇾',
  Perú: '🇵🇪',
  Surinam: '🇸🇷',
  Uruguay: '🇺🇾',
  Venezuela: '🇻🇪',
  Australia: '🇦🇺',
  Fiyi: '🇫🇯',
  Kiribati: '🇰🇮',
  Micronesia: '🇫🇲',
  Nauru: '🇳🇷',
  'Nueva Zelanda': '🇳🇿',
  Palau: '🇵🇼',
  'Papúa Nueva Guinea': '🇵🇬',
  Samoa: '🇼🇸',
  'Islas Salomón': '🇸🇧',
  Tonga: '🇹🇴',
  Tuvalu: '🇹🇻',
  Vanuatu: '🇻🇺'
};

const countries = {
  África: [
    'Angola', 'Argelia', 'Benín', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde',
    'Camerún', 'Chad', 'Comoras', 'Costa de Marfil', 'Djibouti', 'Egipto', 'Eritrea',
    'eSwatini', 'Etiopía', 'Gabón', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Guinea Ecuatorial',
    'Lesoto', 'Liberia', 'Libia', 'Madagascar', 'Malaui', 'Malí', 'Marruecos', 'Mauricio', 'Mauritania',
    'Mozambique', 'Namibia', 'Níger', 'Nigeria', 'Kenia', 'República Centroafricana',
    'República del Congo', 'República Democrática del Congo', 'Ruanda', 'Santo Tomé y Príncipe',
    'Senegal', 'Sierra Leona', 'Seychelles', 'Somalia', 'Sudán', 'Sudán del Sur', 'Tanzania',
    'Togo', 'Túnez', 'Uganda', 'Zambia', 'Zimbabue'
  ],
  Europa: [
    'Albania', 'Alemania', 'Andorra', 'Armenia', 'Austria', 'Azerbaiyán', 'Bélgica',
    'Bielorrusia', 'Bosnia y Herzegovina', 'Bulgaria', 'Chipre', 'Croacia', 'Dinamarca',
    'Eslovaquia', 'Eslovenia', 'España', 'Estonia', 'Finlandia', 'Francia', 'Georgia', 'Grecia',
    'Hungría', 'Irlanda', 'Islandia', 'Italia', 'Kosovo', 'Letonia', 'Liechtenstein', 'Lituania',
    'Luxemburgo', 'Macedonia del Norte', 'Malta', 'Moldavia', 'Mónaco', 'Montenegro', 'Noruega',
    'Países Bajos', 'Polonia', 'Portugal', 'Reino Unido', 'República Checa', 'Rumania',
    'Rusia', 'San Marino', 'Serbia', 'Suecia', 'Suiza', 'Ucrania', 'Vaticano'
  ],
  Asia: [
    'Afganistán', 'Arabia Saudita', 'Armenia', 'Azerbaiyán', 'Bahréin', 'Bangladesh', 'Brunéi',
    'Bután', 'Camboya', 'Catar', 'China', 'Chipre', 'Singapur', 'Corea del Norte', 'Corea del Sur',
    'Emiratos Árabes Unidos', 'Filipinas', 'Georgia', 'India', 'Indonesia', 'Irán', 'Iraq', 'Israel',
    'Japón', 'Jordania', 'Kuwait', 'Laos', 'Líbano', 'Malasia', 'Maldivas', 'Myanmar', 'Mongolia',
    'Nepal', 'Omán', 'Pakistán', 'Kirguistán', 'Rusia', 'Siria', 'Sri Lanka', 'Tayikistán',
    'Tailandia', 'Timor Oriental', 'Turkmenistán', 'Turquía', 'Uzbekistán', 'Vietnam', 'Yemen'
  ],
  'América del Norte': [
    'Antigua y Barbuda', 'Bahamas', 'Barbados', 'Belice', 'Canadá', 'Costa Rica', 'Cuba',
    'Dominica', 'El Salvador', 'Estados Unidos', 'Granada', 'Guatemala', 'Haití', 'Honduras',
    'Jamaica', 'México', 'Nicaragua', 'Panamá', 'República Dominicana', 'Santa Lucía',
    'San Cristóbal y Nieves', 'San Vicente y las Granadinas', 'Trinidad y Tobago'
  ],
  'América del Sur': [
    'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 'Guayana', 'Paraguay',
    'Perú', 'Surinam', 'Uruguay', 'Venezuela'
  ],
  Oceanía: [
    'Australia', 'Fiyi', 'Kiribati', 'Micronesia', 'Nauru', 'Nueva Zelanda', 'Palau',
    'Papúa Nueva Guinea', 'Samoa', 'Islas Salomón', 'Tonga', 'Tuvalu', 'Vanuatu'
  ],
};
// Exportar o objeto countriesWithEmojis para uso externo
module.exports = { countriesWithEmojis, countries };
