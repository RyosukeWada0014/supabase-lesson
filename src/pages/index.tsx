import { ReactNode } from "react";
import type { NextPage } from "next";
import { Auth, Button, IconLogOut, Typography } from "@supabase/ui";
import { client } from "src/libs/supabase";
import { LayoutWrapper } from "src/components/LayoutWrapper";

type Props = {
  children: ReactNode;
};

const Container = (props: Props) => {
  const { user } = Auth.useUser();
  
  if (user) {
    return (
      <div>
        <div className="flex justify-end mx-2 my-4">
        <Typography.Text>Signed in: {user.email}</Typography.Text>
          <Button
            size="medium"
            icon={<IconLogOut />}
            onClick={() => client.auth.signOut()}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }
  return <div>{props.children}</div>;
};

const Home: NextPage = () => {
  return (
    <LayoutWrapper>
      <Auth.UserContextProvider supabaseClient={client}>
        <Container>
          <div className="flex justify-center pt-8">
            <div className="w-full sm:w-96">
              <Auth
                supabaseClient={client}
                providers={["github"]}
                socialColors={true}
              />
            </div>
          </div>
        </Container>
      </Auth.UserContextProvider>
    </LayoutWrapper>
  );
};

export default Home;
