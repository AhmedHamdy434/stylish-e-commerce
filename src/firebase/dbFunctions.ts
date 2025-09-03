import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./config";
import { ProductType } from "./firestore";

// ✅ Add to favorites
export const addToFavorites = async (productId: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(db, "users", userId, "favorites", productId);
  await setDoc(ref, { addedAt: new Date() });
};

// ✅ Remove from favorites
export const removeFromFavorites = async (productId: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(db, "users", userId, "favorites", productId);
  await deleteDoc(ref);
};
//  is in favourite
export const isInFavorites = async (productId: string): Promise<boolean> => {
  const userId = auth.currentUser?.uid;
  if (!userId) return false;

  const ref = doc(db, "users", userId, "favorites", productId);
  const snap = await getDoc(ref);
  return snap.exists();
};
// ✅ Get all favorites
export const getFavorites = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return [];

  const snapshot = await getDocs(collection(db, "users", userId, "favorites"));
  return snapshot.docs.map((doc) => doc.id);
};

//  cart
// ✅ Add to cart
export const addToCart = async (id: string, size: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(db, "users", userId, "cart", id);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    // increase quantity
    await updateDoc(ref, {
      quantity: existing.data().quantity + 1,
      size: size,
    });
  } else {
    await setDoc(ref, {
      quantity: 1,
      size: size,
      addedAt: new Date(),
    });
  }
};

// ✅ Remove from cart
export const removeFromCart = async (productId: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(db, "users", userId, "cart", productId);
  await deleteDoc(ref);
};
// ✅ decrease item from cart

export const decreaseCartQuantity = async (productId: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(db, "users", userId, "cart", productId);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    const currentQty = docSnap.data().quantity;

    if (currentQty > 1) {
      await updateDoc(ref, {
        quantity: currentQty - 1,
      });
    } else {
      // Remove item if quantity becomes 0
      await deleteDoc(ref);
    }
  }
};

// ✅ Get all cart items
export const getCartItems = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return [];

  const snapshot = await getDocs(collection(db, "users", userId, "cart"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    quantity: doc.data().quantity || 1,
    size: doc.data().size || null,
  }));
};

// ✅ Check if product is in cart
export const isInCart = async (
  productId: string,
  userId?: string
): Promise<boolean> => {
  if (!userId) return false;

  const ref = doc(db, "users", userId, "cart", productId);
  const snap = await getDoc(ref);

  return snap.exists();
};

// change size
export const updateCartItemSize = async (
  productId: string,
  newSize: string
) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(db, "users", userId, "cart", productId);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    await updateDoc(ref, { size: newSize });
  }
};

// user details by id
export const getUserDetails = async (userId: string) => {
  if (!userId) return null;

  const ref = doc(db, "users", "userDetails", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    uid: snap.id,
    ...snap.data(),
  };
};

// ✅ Get quantity of a specific product in cart
export const getCartItemQuantity = async (
  productId: string
): Promise<number> => {
  const userId = auth.currentUser?.uid;
  if (!userId) return 0;

  const ref = doc(db, "users", userId, "cart", productId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return 0;

  return snap.data().quantity || 0;
};

// ✅ Get size of a specific product in cart
export const getCartItemSize = async (
  productId: string
): Promise<string | null> => {
  const userId = auth.currentUser?.uid;
  if (!userId) return null;

  const ref = doc(db, "users", userId, "cart", productId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data().size || null;
};

// assuming you already have these types somewhere:
export type CartType = {
  id: string;
  quantity: number;
  size: string | null;
  addedAt?: Date;
};

export type CartItemWithProduct = {
  cartItem: CartType;
  product: ProductType;
};

// ✅ Get cart items + product details
export const getCartWithProducts = async (
  userId?: string
): Promise<CartItemWithProduct[]> => {
  if (!userId) return [];

  const snapshot = await getDocs(collection(db, "users", userId, "cart"));

  const cartItems: CartItemWithProduct[] = [];

  for (const docSnap of snapshot.docs) {
    const cartData = docSnap.data();
    const cartItem: CartType = {
      id: docSnap.id,
      quantity: cartData.quantity || 1,
      size: cartData.size || null,
      addedAt: cartData.addedAt?.toDate?.() || undefined,
    };

    // get product details
    const productRef = doc(db, "products", docSnap.id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = productSnap.data() as Omit<ProductType, "id">;
      cartItems.push({
        cartItem,
        product: { id: productSnap.id, ...productData },
      });
    }
  }

  return cartItems;
};

// ✅ Get total price of all products in the user's cart
export const getCartTotalPrice = async (userId?: string): Promise<number> => {
  if (!userId) return 0;

  const cartSnap = await getDocs(collection(db, "users", userId, "cart"));
  if (cartSnap.empty) return 0;

  let total = 0;

  for (const docSnap of cartSnap.docs) {
    const cartData = docSnap.data();
    const quantity = cartData.quantity || 1;

    // get product from products collection
    const productRef = doc(db, "products", docSnap.id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      const price = productData.newPrice || 0;

      total += price * quantity;
    }
  }

  return total;
};
