import z from "zod";

export class ZodSchema {
  static category = z.object({
    category_name: z
      .string({ message: "Le nom de la catégorie est requis." })
      .max(100, { message: "Le nom de la catégorie ne peut pas dépasser 100 caractères." }),
  });

  static account = z.object({
    suspended: z
      .boolean({ message: "Le champ 'suspended' doit être un booléen." })
      .nullable()
      .optional(),
    is_modo: z
      .boolean({ message: "Le champ 'is_modo' doit être un booléen." })
      .nullable()
      .optional(),
    username: z
      .string({ message: "Le nom d'utilisateur est requis." })
      .max(100, { message: "Le nom d'utilisateur ne peut pas dépasser 100 caractères." }),
    password: z
      .string({ message: "Le mot de passe est requis." })
      .max(500, { message: "Le mot de passe ne peut pas dépasser 500 caractères." }),
    is_vendor: z
      .boolean({ message: "Le champ 'is_vendor' doit être un booléen." })
      .nullable()
      .optional(),
    number_of_reports: z
      .number({ message: "Le nombre de signalements doit être un nombre." })
      .int({ message: "Le nombre de signalements doit être un entier." }),
  });

  static administrator = z.object({
    username: z
      .string({ message: "Le nom d'utilisateur est requis." })
      .max(100, { message: "Le nom d'utilisateur ne peut pas dépasser 100 caractères." }),
    password: z
      .string({ message: "Le mot de passe est requis." })
      .max(500, { message: "Le mot de passe ne peut pas dépasser 500 caractères." }),
  });

  static product = z.object({
    product_name: z
      .string({ message: "Le nom du produit est requis." })
      .max(100, { message: "Le nom du produit ne peut pas dépasser 100 caractères." }),
    suspended: z
      .boolean({ message: "Le champ 'suspended' doit être un booléen." })
      .nullable()
      .optional(),
    product_description: z
      .string({ message: "La description du produit est requise." })
      .max(5000, { message: "La description du produit ne peut pas dépasser 5000 caractères." }),
    product_price: z
      .number({ message: "Le prix du produit doit être un nombre." })
      .nonnegative({ message: "Le prix du produit ne peut pas être négatif." }),
    product_image_path: z
      .string({ message: "Le chemin de l'image du produit est requis." })
      .max(500, { message: "Le chemin de l'image ne peut pas dépasser 500 caractères." }),
    number_of_sells: z
      .number({ message: "Le nombre de ventes doit être un nombre." })
      .int({ message: "Le nombre de ventes doit être un entier." })
      .nonnegative({ message: "Le nombre de ventes ne peut pas être négatif." }),
    number_of_reports: z
      .number({ message: "Le nombre de signalements doit être un nombre." })
      .int({ message: "Le nombre de signalements doit être un entier." })
      .nonnegative({ message: "Le nombre de signalements ne peut pas être négatif." }),
    available_quantity: z
      .number({ message: "La quantité disponible doit être un nombre." })
      .int({ message: "La quantité disponible doit être un entier." })
      .nonnegative({ message: "La quantité disponible ne peut pas être négative." }),
    account_id: z
      .number({ message: "L'identifiant du compte est requis." })
      .int({ message: "L'identifiant du compte doit être un entier." })
      .positive({ message: "L'identifiant du compte doit être supérieur à 0." }),
  });

  static customer_order = z.object({
    id: z
      .number({ message: "L'identifiant de la commande doit être un nombre." })
      .int({ message: "L'identifiant de la commande doit être un entier." })
      .positive({ message: "L'identifiant de la commande doit être supérieur à 0." }),
    order_date: z.coerce.date({ message: "La date de commande doit être une date valide." }),
    order_total_sum: z
      .number({ message: "Le total de la commande doit être un nombre." })
      .nonnegative({ message: "Le total de la commande ne peut pas être négatif." }),
    is_current: z.boolean({ message: "Le champ 'is_current' doit être un booléen." }),
    account_id: z
      .number({ message: "L'identifiant du compte est requis." })
      .int({ message: "L'identifiant du compte doit être un entier." })
      .positive({ message: "L'identifiant du compte doit être supérieur à 0." }),
  });
}
