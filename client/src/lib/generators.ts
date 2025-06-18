export function generateCPF(formatted: boolean = true): string {
  const cpf = [];
  for (let i = 0; i < 9; i++) {
    cpf.push(Math.floor(Math.random() * 10));
  }
  
  // Calculate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += cpf[i] * (10 - i);
  }
  let remainder = sum % 11;
  cpf.push(remainder < 2 ? 0 : 11 - remainder);
  
  // Calculate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cpf[i] * (11 - i);
  }
  remainder = sum % 11;
  cpf.push(remainder < 2 ? 0 : 11 - remainder);
  
  const cpfString = cpf.join('');
  return formatted ? cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : cpfString;
}

export function generateCNPJ(formatted: boolean = true): string {
  const cnpj = [];
  for (let i = 0; i < 12; i++) {
    cnpj.push(Math.floor(Math.random() * 10));
  }
  
  // Calculate first check digit
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += cnpj[i] * weights1[i];
  }
  let remainder = sum % 11;
  cnpj.push(remainder < 2 ? 0 : 11 - remainder);
  
  // Calculate second check digit
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += cnpj[i] * weights2[i];
  }
  remainder = sum % 11;
  cnpj.push(remainder < 2 ? 0 : 11 - remainder);
  
  const cnpjString = cnpj.join('');
  return formatted ? cnpjString.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : cnpjString;
}

export function generateCEP(): string {
  const cep = Math.floor(Math.random() * 90000000) + 10000000;
  return cep.toString().replace(/(\d{5})(\d{3})/, '$1-$2');
}

export function generateFullAddress() {
  const streets = [
    'Rua das Flores', 'Av. Brasil', 'Rua da Paz', 'Av. Paulista', 'Rua do Comércio', 
    'Av. Atlântica', 'Rua XV de Novembro', 'Av. JK', 'Rua da Liberdade', 'Av. Copacabana',
    'Rua dos Três Irmãos', 'Av. Getúlio Vargas', 'Rua São João', 'Av. Rio Branco',
    'Rua da Consolação', 'Av. Presidente Vargas', 'Rua Augusta', 'Av. Ipiranga'
  ];
  
  const neighborhoods = [
    'Centro', 'Jardim América', 'Vila Nova', 'São João', 'Santa Maria', 'Boa Vista',
    'Copacabana', 'Ipanema', 'Leblon', 'Barra da Tijuca', 'Moema', 'Vila Olímpia',
    'Perdizes', 'Pinheiros', 'Jardins', 'Liberdade', 'Bela Vista', 'Consolação'
  ];
  
  const cities = [
    'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Brasília',
    'Curitiba', 'Recife', 'Porto Alegre', 'Manaus', 'Belém', 'Goiânia',
    'Guarulhos', 'Campinas', 'São Luís', 'Maceió', 'Natal', 'Teresina'
  ];
  
  const states = ['SP', 'RJ', 'MG', 'BA', 'DF', 'PR', 'PE', 'RS', 'AM', 'PA', 'GO', 'MA', 'AL', 'RN', 'PI'];
  
  const cep = generateCEP();
  const street = streets[Math.floor(Math.random() * streets.length)];
  const number = Math.floor(Math.random() * 9999) + 1;
  const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  
  return {
    cep,
    street: `${street}, ${number}`,
    neighborhood,
    city,
    state,
    fullAddress: `${street}, ${number} - ${neighborhood}, ${city} - ${state}, ${cep}`
  };
}

export function generatePassword(options: {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}): string {
  let chars = '';
  if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (options.numbers) chars += '0123456789';
  if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (!chars) return '';
  
  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return password;
}

export function generateLorem(type: 'words' | 'sentences' | 'paragraphs', count: number): string {
  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];
  
  if (type === 'words') {
    const words = [];
    for (let i = 0; i < count; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return words.join(' ');
  }
  
  if (type === 'sentences') {
    let result = '';
    for (let i = 0; i < count; i++) {
      const sentenceLength = Math.floor(Math.random() * 10) + 5;
      const words = [];
      for (let j = 0; j < sentenceLength; j++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      const sentence = words.join(' ');
      result += sentence.charAt(0).toUpperCase() + sentence.slice(1) + '. ';
    }
    return result.trim();
  }
  
  // paragraphs
  let result = '';
  for (let i = 0; i < count; i++) {
    const sentences = Math.floor(Math.random() * 5) + 3;
    let paragraph = '';
    for (let j = 0; j < sentences; j++) {
      const sentenceLength = Math.floor(Math.random() * 10) + 5;
      const words = [];
      for (let k = 0; k < sentenceLength; k++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      const sentence = words.join(' ');
      paragraph += sentence.charAt(0).toUpperCase() + sentence.slice(1) + '. ';
    }
    result += paragraph + '\n\n';
  }
  
  return result.trim();
}

export function generatePerson(gender: 'male' | 'female' | 'random' = 'random') {
  const firstNames = {
    male: ['João', 'José', 'Pedro', 'Paulo', 'Carlos', 'Luis', 'Marcos', 'Rafael', 'Felipe', 'Bruno', 'André', 'Diego', 'Lucas', 'Gabriel', 'Mateus'],
    female: ['Maria', 'Ana', 'Francisca', 'Antônia', 'Adriana', 'Juliana', 'Márcia', 'Fernanda', 'Patricia', 'Aline', 'Camila', 'Larissa', 'Beatriz', 'Amanda', 'Carla']
  };
  
  const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Rocha'];
  
  const streets = ['Rua das Flores', 'Av. Brasil', 'Rua da Paz', 'Av. Paulista', 'Rua do Comércio', 'Av. Atlântica', 'Rua XV de Novembro', 'Av. JK'];
  const neighborhoods = ['Centro', 'Jardim América', 'Vila Nova', 'São João', 'Santa Maria', 'Boa Vista', 'Copacabana', 'Ipanema'];
  const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Brasília', 'Curitiba', 'Recife', 'Porto Alegre'];
  const states = ['SP', 'RJ', 'MG', 'BA', 'DF', 'PR', 'PE', 'RS'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const colors = ['Azul', 'Verde', 'Vermelho', 'Amarelo', 'Roxo', 'Rosa', 'Laranja', 'Preto', 'Branco', 'Cinza'];
  const signs = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'];
  
  const selectedGender = gender === 'random' ? (Math.random() > 0.5 ? 'male' : 'female') : gender;
  
  const firstName = firstNames[selectedGender][Math.floor(Math.random() * firstNames[selectedGender].length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  const fullName = `${firstName} ${lastName} ${lastName2}`;
  const age = Math.floor(Math.random() * 60) + 18;
  const cpf = generateCPF(true);
  const rg = generateRG();
  const phone = generatePhoneNumber();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${['gmail.com', 'hotmail.com', 'yahoo.com.br', 'outlook.com'][Math.floor(Math.random() * 4)]}`;
  const password = generateRandomPassword();
  
  // Endereço
  const cep = generateCEP();
  const street = streets[Math.floor(Math.random() * streets.length)];
  const number = Math.floor(Math.random() * 9999) + 1;
  const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  
  // Características físicas
  const height = (Math.random() * 0.5 + 1.5).toFixed(2); // 1.50m a 2.00m
  const weight = Math.floor(Math.random() * 50) + 50; // 50kg a 100kg
  const bloodType = bloodTypes[Math.floor(Math.random() * bloodTypes.length)];
  
  // Filiação
  const motherName = `${firstNames.female[Math.floor(Math.random() * firstNames.female.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]} ${lastName}`;
  const fatherName = `${firstNames.male[Math.floor(Math.random() * firstNames.male.length)]} ${lastName} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  
  return {
    name: fullName,
    age,
    cpf,
    rg,
    phone,
    email,
    password,
    gender: selectedGender === 'male' ? 'Masculino' : 'Feminino',
    sign: signs[Math.floor(Math.random() * signs.length)],
    mother: motherName,
    father: fatherName,
    address: {
      cep,
      street: `${street}, ${number}`,
      neighborhood,
      city,
      state
    },
    physical: {
      height: `${height}m`,
      weight: `${weight}kg`,
      bloodType
    },
    favoriteColor: colors[Math.floor(Math.random() * colors.length)]
  };
}

function generateRG(): string {
  const rg = Math.floor(Math.random() * 900000000) + 100000000;
  return rg.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
}

function generateRandomPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function generatePhoneNumber(): string {
  const ddd = Math.floor(Math.random() * 20) + 11;
  const number = Math.floor(Math.random() * 900000000) + 100000000;
  return `(${ddd}) 9${number.toString().substring(0, 4)}-${number.toString().substring(4)}`;
}
