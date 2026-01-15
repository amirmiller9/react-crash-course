import fs from 'node:fs';

export async function getMeals() {
  // Simulate some delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      title: 'Juicy Cheese Burger',
      slug: 'juicy-cheese-burger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
      summary:
        'A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.',
      instructions: `
        1. Prepare the patty: Mix 200g of ground beef with salt and pepper. Form into a patty.
        2. Sear the patty: Heat a pan with a bit of oil and sear the patty for 3-4 minutes per side.
        3. Add cheese: Place a slice of cheese on the patty and let it melt.
        4. Assemble: Toast the bun, add the patty, and your favorite toppings.
      `,
      creator: 'John Doe',
      creator_email: 'johndoe@example.com',
    },
    {
      title: 'Classic Mac n Cheese',
      slug: 'classic-mac-n-cheese',
      image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop',
      summary:
        "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
      instructions: `
        1. Cook macaroni: Boil macaroni according to package instructions.
        2. Prepare cheese sauce: Melt butter, stir in flour, then gradually add milk until thickened. Stir in cheese.
        3. Combine: Mix the cooked macaroni with the cheese sauce.
        4. Bake: Optional, bake with extra cheese on top for a golden crust.
      `,
      creator: 'Laura Smith',
      creator_email: 'laurasmith@example.com',
    },
    {
      title: 'Authentic Pizza',
      slug: 'authentic-pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
      summary:
        'Hand-tossed pizza with a crispy crust, tangy tomato sauce, and fresh toppings.',
      instructions: `
        1. Prepare the dough: Mix flour, yeast, water, and salt. Knead and let rise.
        2. Roll out dough: Roll the dough into a thin circle.
        3. Add toppings: Spread tomato sauce and add your favorite toppings and cheese.
        4. Bake: Bake in a hot oven until the crust is golden and cheese is bubbly.
      `,
      creator: 'Mario Rossi',
      creator_email: 'mariorossi@example.com',
    },
    {
      title: 'Wiener Schnitzel',
      slug: 'wiener-schnitzel',
      image: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?q=80&w=800&auto=format&fit=crop',
      summary:
        'Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.',
      instructions: `
        1. Prepare the cutlet: Pound the veal cutlet until thin.
        2. Bread the cutlet: Coat the cutlet in flour, then beaten egg, then breadcrumbs.
        3. Fry: Fry the cutlet in a pan with plenty of butter or oil until golden brown on both sides.
        4. Serve: Serve with a slice of lemon and potato salad.
      `,
      creator: 'Franz Huber',
      creator_email: 'franzhuber@example.com',
    },
    {
      title: 'Fresh Tomato Salad',
      slug: 'fresh-tomato-salad',
      image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=800&auto=format&fit=crop',
      summary:
        'A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.',
      instructions: `
        1. Chop tomatoes: Slice fresh tomatoes into wedges or bite-sized pieces.
        2. Add basil: Tear fresh basil leaves and add to the tomatoes.
        3. Prepare vinaigrette: Mix olive oil, balsamic vinegar, salt, and pepper.
        4. Toss and serve: Drizzle the vinaigrette over the salad and toss gently.
      `,
      creator: 'Sophia Wood',
      creator_email: 'sophiawood@example.com',
    },
  ];
}
