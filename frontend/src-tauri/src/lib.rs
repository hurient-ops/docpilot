// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // PoC: Start Python Backend automatically when Tauri starts
            #[cfg(desktop)]
            {
                use std::process::Command;
                let mut cmd = Command::new("e:/projects/docpilot/backend/venv/Scripts/python.exe");
                cmd.arg("e:/projects/docpilot/backend/main.py");
                
                match cmd.spawn() {
                    Ok(mut child) => {
                        println!("Backend started with PID: {}", child.id());
                        // Normally we would store this child process and kill it on exit,
                        // but for PoC we just let it run.
                    }
                    Err(e) => {
                        eprintln!("Failed to start backend: {}", e);
                    }
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
