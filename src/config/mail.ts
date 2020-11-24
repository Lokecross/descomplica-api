interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'thiagofilipestival5@gmail.com',
      name: 'Thiago do GoBarber',
    },
  },
} as IMailConfig;
