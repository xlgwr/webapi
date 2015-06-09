using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.DirectoryServices;

namespace CCG.WebAPI.Core.Models
{
    #region demo test
    //    string username = "jason";
    //string password = "supersecretpassword";
    //string domain = "home.vallery.net";

    ////Create new helper object with the username and password of service account
    //ADHelper helper = new ADHelper(username, password, domain);

    ////Lookup the DN of our user
    //string userDN = helper.GetUserDN("home\\jason");

    ////Lookup the DN of our group
    //string groupDN = helper.GetGroupDN("AWESOME PEOPLE GROUP");


    ////Determine if our user is in the group
    //Console.WriteLine(string.Format("Is {0} a member of {1}: {2}", userDN, groupDN, helper.isUserInGroup(userDN, groupDN).ToString()));

    ////Add our user to the group
    //helper.AddToGroup(userDN, groupDN);

    ////Determine if our user is in the group
    //Console.WriteLine(string.Format("Is {0} a member of {1}: {2}", userDN, groupDN, helper.isUserInGroup(userDN, groupDN).ToString()));

    ////Remove user from the group
    //helper.RemoveUserFromGroup(userDN, groupDN);

    ////Determine if our user is in the group
    //Console.WriteLine(string.Format("Is {0} a member of {1}: {2}", userDN, groupDN, helper.isUserInGroup(userDN, groupDN).ToString()));

    //Console.ReadLine();
    #endregion
    public class ADHelper
    {
        private string username;
        private string password;
        public string domain;

        public ADHelper(string username, string password, string domain)
        {
            this.username = username;
            this.password = password;
            this.domain = domain;
        }
        public static string checkUserAndPasswd(string domain, string username, string password)
        {
            //Split out the identity to get just the username portion
            try
            {
                if (!(string.IsNullOrEmpty(username) && string.IsNullOrEmpty(password) && string.IsNullOrEmpty(domain)))
                {
                    using (var rootEntry = new DirectoryEntry("LDAP://" + domain, username, password, AuthenticationTypes.Secure))
                    {
                        using (var directorySearcher = new DirectorySearcher(rootEntry, String.Format("(sAMAccountName={0})", username)))
                        {
                            var searchResult = directorySearcher.FindOne();
                            if (searchResult != null)
                            {
                                using (var userEntry = searchResult.GetDirectoryEntry())
                                {
                                    return (string)userEntry.Properties["distinguishedName"].Value;
                                }
                            }
                        }
                    }
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }

        }

        //Looks up the DN for a user based on the sAMAccountName
        public string GetUserDN(string identity)
        {
            //Split out the identity to get just the username portion
            if (identity.Contains("\\"))
            {
                string[] identityList = identity.Split('\\');
                string userName = identityList[1];
                using (var rootEntry = new DirectoryEntry("LDAP://" + domain, this.username, this.password, AuthenticationTypes.Secure))
                {
                    using (var directorySearcher = new DirectorySearcher(rootEntry, String.Format("(sAMAccountName={0})", userName)))
                    {
                        var searchResult = directorySearcher.FindOne();
                        if (searchResult != null)
                        {
                            using (var userEntry = searchResult.GetDirectoryEntry())
                            {
                                return (string)userEntry.Properties["distinguishedName"].Value;
                            }
                        }
                    }
                }
            }
            return null;
        }


        //Looks up the DN for the group based on the name
        public string GetGroupDN(string groupname)
        {
            using (var rootEntry = new DirectoryEntry("LDAP://" + domain, this.username, this.password, AuthenticationTypes.Secure))
            {
                using (var directorySearcher = new DirectorySearcher(rootEntry, String.Format("(&(objectCategory=group)(cn={0}))", groupname)))
                {
                    var searchResult = directorySearcher.FindOne();
                    if (searchResult != null)
                    {
                        using (var userEntry = searchResult.GetDirectoryEntry())
                        {
                            return (string)userEntry.Properties["distinguishedName"].Value;
                        }
                    }
                }
            }
            return null;
        }



        //Checks to see if a user is in a group and returns a bool
        public bool isUserInGroup(string userDn, string groupDn)
        {
            bool match = false;


            DirectoryEntry user = new DirectoryEntry("LDAP://" + userDn, this.username, this.password, AuthenticationTypes.Secure);
            foreach (string group in user.Properties["memberof"])
                if (group == groupDn)
                    match = true;

            return match;
        }


        //Adds a given user to a group 
        public bool AddToGroup(string userDn, string groupDn)
        {
            bool success = false;
            try
            {
                DirectoryEntry dirEntry = new DirectoryEntry("LDAP://" + groupDn, this.username, this.password, AuthenticationTypes.Secure);
                dirEntry.Properties["member"].Add(userDn);
                dirEntry.CommitChanges();
                dirEntry.Close();
                success = true;
            }
            catch (System.DirectoryServices.DirectoryServicesCOMException ex)
            {
                success = false;
            }

            return success;
        }

        //Removes a user from a group
        public bool RemoveUserFromGroup(string userDn, string groupDn)
        {
            bool success = false;
            try
            {
                DirectoryEntry dirEntry = new DirectoryEntry("LDAP://" + groupDn);
                dirEntry.Properties["member"].Remove(userDn);
                dirEntry.CommitChanges();
                dirEntry.Close();
                success = true;
            }
            catch (System.DirectoryServices.DirectoryServicesCOMException ex)
            {

                success = false;
            }
            return success;
        }
        public static bool GetUserInfo(out List<string> userInformation, string strdomain, string userName)
        {
            userInformation = new List<string>();
            var valueReturn = false;
            try
            {

                string pathNameDomain = @"LDAP://" + strdomain;

                var direcotyEntry = new DirectoryEntry(pathNameDomain);


                var directorySearcher = new DirectorySearcher(direcotyEntry)
                    {
                        Filter = "(&(objectClass=user)(sAMAccountName=" + userName + "))"
                    };

                var searchResults = directorySearcher.FindAll();

                valueReturn = searchResults.Count > 0;

                foreach (SearchResult searchResult in searchResults)
                {

                    foreach (var valueCollection in searchResult.Properties.PropertyNames)
                    {
                        userInformation.Add(valueCollection.ToString() + " = " + searchResult.Properties[valueCollection.ToString()][0].ToString());
                    }
                }

                direcotyEntry.Dispose();
                directorySearcher.Dispose();
                searchResults.Dispose();
            }
            catch (InvalidOperationException iOe)
            {
            }
            catch (NotSupportedException nSe)
            {
            }
            finally
            {
            }
            return valueReturn;
        }
    }
}
