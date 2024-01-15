import { INewUser } from "@/types/types.index";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID, Query } from "appwrite";
const { databaseId, userCollectionId } = appwriteConfig
export async function createUserAccount({name, username, password, email}: INewUser) {
  let result = null
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    )
    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(name)
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username,
      imageUrl: avatarUrl
    });
    result = newUser
  } catch (error) {
    console.log(error)
  }
  return result;
}

export async function saveUserToDB(user: {accountId: string, email: string,
  name: string, imageUrl: URL; username?: string;
}) {
  let result = null
  try {
    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      user,
    )
    result = newUser
  } catch (error) {
    console.log(error)
  }
  return result
}

export async function signInAccount(user: {email: string, password: string}) {
  let result = null
  try {
    const session = await account.createEmailSession(user.email, user.password)
    result = session
  } catch (error) {
    console.log(error)
  }
  return result
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  let result = null
  try {
    const currentAccount = await getAccount()
    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error;
    
    result = currentUser.documents[0]
  } catch (error) {
    console.log(error)
  }
  return result
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}