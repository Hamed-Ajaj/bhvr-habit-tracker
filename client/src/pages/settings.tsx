import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword, deleteUser, updateUser, useSession } from "@/lib/auth-client";
import { resetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Camera, Key, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const SettingsPage = () => {

  const { data: session, isPending } = useSession();

  const [fullName, setFullName] = useState(session?.user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  type resetPasswordTypes = z.infer<typeof resetPasswordSchema>
  const resetPassswordForm = useForm<resetPasswordTypes>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const handleSaveProfile = async () => {
    // Handle profile update logic here
    console.log("Saving profile:", { fullName });
    await updateUser({ name: fullName });
    toast.success("Profile updated successfully");
  };

  const handleChangePassword = async () => {
    const { data, error } = await changePassword({
      newPassword,
      currentPassword,
      revokeOtherSessions: true,
    })

    if (!error) {
      toast.success("Password changed successfully");
    }

    if (error) {
      toast.error(error.message);
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = async () => {
    try {

      await deleteUser({
        callbackURL: "/",
      });

      toast.success("Account deleted successfully");

    } catch (error) {
      toast.error("Failed to delete account");
    }
  };


  // const form = useForm<SignUpForm>({
  //   resolver: zodResolver(signUpSchema),
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   },
  // })


  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Profile picture change event:", event);
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Convert file to base64 string
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result as string;
          console.log("Base64 string:", base64String);
          await updateUser({ image: base64String });
          console.log("Profile picture updated successfully");
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Failed to update profile picture:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Page Title */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">Profile Information</CardTitle>
          <CardDescription>Update your personal information and profile picture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={session?.user?.image} className="bg-center object-cover" alt={session?.user?.name} />
              <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <Label htmlFor="profile-picture" className="cursor-pointer">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
                  <span>
                    <Camera className="w-4 h-4 mr-2" />
                    Change Picture
                  </span>
                </Button>
              </Label>
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
              <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF (max 5MB)</p>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email Address</Label>
            <p className="text-sm text-gray-500">This is your login email</p>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
              {session?.user?.email}
            </div>
          </div>
          <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">Security</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Change Password</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter your current password and choose a new one.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleChangePassword}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Update Password
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove all of your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Yes, delete my account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
