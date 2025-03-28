export const Sections = [
  {
    header: {
      title: "Birkir Viðar Reynisson",
      subTitle: "Forritari",
    },
  },
  {
    contact: {
      email: "birkirvr@gmail.com",
      phone: "790-8585",
      web: "github.com/kirbir",
    },
  },
  {
    about: {
      text: "Í dag er ég að bæta við mig forritunarþekkingu á annarri önn af þremmur á forritunarbraut hjá NTV. Gervigreind, veflausnir, öpp og tölvuleikir þar er framtíðin mín.",
      title: "Um mig",
    },
  },
  {
    reynsla: {
      companies: [
        {
          companyName: "Ayurveda Ehf",
          description:
            "Hef verið að aðstoða í hlutastarfi að byggja upp netverslun Pureshilajit.is með góðum árangri. Hannaði síðuna og viðheld henni og starfa að markaðsetningu og grafískri hönnun og vefforritun fyrir Ayurveda ehf.",
          jobTitle: "Vefhönnuður, Markaðssetning",
          year: "2024-2025",
        },
        {
          companyName: "Silfurfat",
          description:
            "Hef sinnt alhliða tækniþjónustu fyrir fyrirtæki. Meðal annars: Samskipti ehf, Sýningarkerfi. Sinnti þjónustu með hugbúnað, útstöðvar, netþjóna, síma og prentara svo einhvað sé nefnt.",
          jobTitle: "Kerfistjóri, Tækniþjónusta",
          year: "2013-2021",
        },
        {
          companyName: "Tölvustoð Ehf",
          description:
            "Starfaði sem tæknimaður, vann við þróun og ráðgjöf á tæknilausnum fyrir fjölda fyrirtækja í útköllum og rekstur á hýsingarlausnum og netkerfum.",
          jobTitle: "Kerfistjóri, Tækniþjónusta",
          year: "2007-2013",
        },
      ],
    },
  },
  {
    menntun: [
        {
          skoli: "NTV",
          namsbraut: "Forritunarbraut Diplómanám",
          year:"2024-2025",
        },
        {
          skoli: "NTV",
          namsbraut: "Microsoft MCSA/MCP & Comptia A++",
          year:"2006-2007",
        },
      ],
  },
  {
    skills: [
        {
          skillName: "Frumkvæði",
        },
        {
          skillName: "Vinalegur"
        },
        {
            skillName:"Vinna í teymi"
        },
        {
            skillName:"Húmor"
        }
      ],
  }
  
] as const;
