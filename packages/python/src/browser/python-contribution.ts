import { injectable, inject } from "@theia/core/shared/inversify";
import {
  Command,
  CommandContribution,
  CommandRegistry,
  MessageService,
} from "@theia/core/lib/common";
import { PythonService } from "../common/python-protocol";

const PLACEHOLDER_TEST_TEXT_WILDEBEEST = `
          This is a problematic text file designed to contain multiple issues for testing purposes:
1. UTF-8 encoding violations: ����� (these should not appear properly).
2. Control characters:  embedded within text.
3. Zero-width characters: word​separator and ‍joiner.
4. Mixed letters/numbers/punctuation/letter-modifiers from various scripts:
   - Arabic: العربية.
   - Greek: αβγ.
   - Cyrillic: АБВ.
   - Latin: aͯ́b.
   - Hebrew: אבג.
5. Tokens with letters from different scripts: αБاא.
6. XML tokens: <tag>Invalid</tag> & "special" <characters />.
7. Tokens with certain punctuation: foo!bar?baz,hello;world.
8. Orphan letter modifiers: áḅ̂.
9. Non-canonical character combinations: áá (á should be normalized to á).
  `;

@injectable()
export class PythonSetupContribution implements CommandContribution {
  static readonly SETUP_ENV: Command = {
    id: "scribe.python.setup",
    label: "Python: Setup Python Environment",
  };

  static readonly SETUP_WILDEBEEST: Command = {
    id: "scribe.python.setup-wildebeest",
    label: "Python: Setup Wildebeest",
  };

  static readonly EXECUTE_WILDEBEEST: Command = {
    id: "scribe.python.execute-wildebeest",
    label: "Python: Execute Wildebeest",
  };

  @inject(MessageService)
  private messageService: MessageService;

  @inject(PythonService)
  private pythonService: PythonService;

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(PythonSetupContribution.SETUP_ENV, {
      execute: async () => {
        this.messageService.info("Starting Python environment setup...");
        try {
          await this.pythonService.setupEnvironment();
          this.messageService.info("Python environment setup completed!");
        } catch (error) {
          this.messageService.error(`Setup failed: ${error.message}`);
        }
      },
    });

    registry.registerCommand(PythonSetupContribution.SETUP_WILDEBEEST, {
      execute: async () => {
        this.messageService.info("Starting Wildebeest setup...");
        try {
          await this.pythonService.setupWildebeest();
          this.messageService.info("Wildebeest setup completed!");
        } catch (error) {
          this.messageService.error(`Setup failed: ${error.message}`);
        }
      },
    });

    registry.registerCommand(PythonSetupContribution.EXECUTE_WILDEBEEST, {
      execute: async () => {
        await this.pythonService.executeWildebeest(PLACEHOLDER_TEST_TEXT_WILDEBEEST);
      },
    });
  }
}
