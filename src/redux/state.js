let state = {
   profilePage: {
      posts: [
         { id: 1, message: "Hi, how are you?", likesCount: 10 },
         { id: 2, message: "It's my first post", likesCount: 33 },
      ],
   },

   dialogsPage: {
      messages: [
         { id: 1, message: "Hola" },
         { id: 2, message: "Como estas??" },
         { id: 3, message: "Buenos noches" },
         { id: 4, message: "Vamos" },
      ],
      dialogs: [
         { id: 1, name: "Messi" },
         { id: 2, name: "Xavi" },
         { id: 3, name: "Iniesta" },
         { id: 4, name: "Suarez" },
         { id: 5, name: "Busquets" },
         { id: 6, name: "Puyol" },
         { id: 7, name: "Valdes" },
      ],
   },
};

export default state;
