
import ChatContainer from "@/components/ChatContainer";

const Index = () => {
  return (
    <div className="p-4 min-h-screen flex flex-col">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-companion-purple">Mental Health Companion</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          A supportive AI friend that listens and offers guidance
        </p>
      </header>
      
      <main className="flex-1 flex flex-col">
        <ChatContainer />
      </main>
      
      <footer className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          This app uses AI to provide support, but is not a replacement for 
          professional mental health care.
        </p>
        <p className="mt-1">
          If you're experiencing a crisis, please contact a mental health professional
          or emergency services.
        </p>
      </footer>
    </div>
  );
};

export default Index;
