import { Link } from "react-router-dom";
import { Brain, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-100 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Brain size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">
                PlacePrep AI
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              AI-powered placement preparation platform to help students crack
              their dream job interviews.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com/"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="https://x.com/"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://linkedin.com/"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/dashboard", label: "Dashboard" },
                { to: "/quiz", label: "Quizzes" },
                { to: "/mock-interview", label: "Mock Interview" },
                { to: "/resume", label: "Resume Analyzer" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/roadmap", label: "Study Roadmap" },
                { to: "/leaderboard", label: "Leaderboard" },
                { to: "/register", label: "Get Started" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} PlacePrep AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Built with ❤️ for placement aspirants
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;